import { Injectable } from '@nestjs/common';
import PrismaService from '../prisma/prisma.service';
import createUserDto from './dto/create_user.dto';
import checkExistUserDto from './dto/checkExist_uset.dto';
import { hashSync, compareSync } from 'bcrypt';
import { loginUserDto } from './dto/login_user.dto';

@Injectable()
export class UsersService {

    constructor(private readonly prisma: PrismaService) { }

    async createNewUser(newUserDetail: createUserDto) {
        try {
            let createResult = await this.prisma.users.create({
                data: {
                    email: newUserDetail.email,
                    password: hashSync(newUserDetail.password, 5),
                    phone: newUserDetail.phone,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar: newUserDetail.avatar
                }
            })

            //---
            console.log("createResult", createResult);


            if (createResult) {
                let createIpResult = await this.prisma.user_IPs.create({
                    data: {
                        userID: createResult.id,
                        ip: newUserDetail.ip
                    }
                })
            }

            //---
            console.log("createResult", createResult);
            console.log("Đăng ký thành công");


            return {
                message: "Đăng ký thành công",
                data: createResult
            }
        } catch (error) {

            //---
            console.log("error", error);

            return { error }
        }
    }

    //kiem tra ton tai
    async check_Exist_Fn(check_Exist: checkExistUserDto) {
        try {
            let checkExist = await this.prisma.users.findFirst({
                where: {
                    OR: [
                        { email: check_Exist.email },
                        { phone: check_Exist.phone }
                    ]
                },
            });

            if (checkExist) {
                if (checkExist.email == check_Exist.email) {

                    //---
                    // console.log("checkExist.email", checkExist.email);
                    // console.log("check_Exist.email", check_Exist.email);
                    console.log("Email đã tồn tại!");

                    return {
                        message: "Email đã tồn tại!",
                        data: checkExist
                    }
                }

                if (checkExist.phone == check_Exist.phone) {

                    //---
                    // console.log("checkExist.phone", checkExist.phone);
                    // console.log("check_Exist.phone", check_Exist.phone);
                    console.log("SDT đã được đăng ký!");


                    return {
                        message: "SDT đã được đăng ký!",
                        data: checkExist
                    }
                }
            } else {

                //---
                console.log("Thông tin tài khoản không trùng, có thể tạo mới");

                return {
                    message: "Thông tin tài khoản không trùng, có thể tạo mới",
                    data: checkExist
                }
            }
        } catch (error) {
            //---
            console.log("error", error);

            return { error }
        }
    }

    async uploadAvatar(updateData: { id: string, avatar: string }) {
        try {
            const data = await this.prisma.users.update({
                where: {
                    id: Number(updateData.id)
                },
                data: {
                    avatar: updateData.avatar
                }
            })
                        //---
                        console.log("updateData.avatar",updateData.avatar);
                        console.log("Chỉnh sửa Avatar thành công");


            return {
                message: "Chỉnh sửa Avatar thành công",
                data
            }
        } catch (error) {
            //---
            console.log("error", error);
            return {
                error
            }
        }
    }

    async confirmEmail(userEmail: string): Promise<boolean> {
        try {
            await this.prisma.users.update({
                where: {
                    email: userEmail
                },
                data: {
                    email_verify: true
                }
            })
            return true
        } catch (error) {
            return false
        }
    }

    async loginFn(loginInfo: loginUserDto) {
        try {
            let userInfo = await this.prisma.users.findUnique({
                where: {
                    email: loginInfo.email
                }
            })

            //---
            // console.log("userInfo", userInfo);

            if (!userInfo) {
                //---
                console.log("Email không tồn tại!");

                return {
                    info: false,
                    message: "Email không tồn tại!"
                }
            }
            if (!userInfo.status) {
                //---
                console.log("Tài khoản hiện đang tạm khoá, xin liên hệ hỗ trợ trực tuyến để biết thêm chi tiết!");

                return {
                    info: false,
                    message: "Tài khoản hiện đang tạm khoá, xin liên hệ hỗ trợ trực tuyến để biết thêm chi tiết!"
                }
            }
            if (!compareSync(loginInfo.password, userInfo.password)) {
                //---
                console.log("Mật khẩu không chính xác!");

                return {
                    info: false,
                    message: "Mật khẩu không chính xác!"
                }
            }
            return {
                message: "Đăng nhập thành công",
                info: userInfo
            }
        } catch (error) {

            //---
            console.log("error", error);

            return error
        }
    }

    async checkLoginFn(data: any) {
        try {
            let loginUser = await this.prisma.users.findFirst({
                where: {
                    email: data.email
                }
            })

            if (loginUser) {
                if (loginUser.status == true) {
                    return {
                        data: loginUser
                    }
                } else {
                    return
                }
            }
        } catch (error) {
            return
        }
    }

    async loginWithGoogle(data: createUserDto) {
        try {
            const checkExist = await this.prisma.users.findFirst({
                where: {
                    email: data.email
                }
            })
            if (checkExist) {
                if (checkExist.status) {
                    return {
                        info: checkExist,
                        message: "Đăng nhập với google thành công"
                    }
                } else {
                    return {
                        message: "Tài khoản đã tạm khoá"
                    }
                }
            } else {
                const result = await this.prisma.users.create({
                    data: {
                        email: data.email,
                        password: data.password,
                        avatar: data.avatar,
                        phone: data.phone,
                        email_verify: true,
                        createAt: String(Math.random() * Date.now()),
                        updateAt: String(Math.random() * Date.now())
                    }
                })
                if (result) {
                    return {
                        info: result,
                        message: "Lần đầu đăng nhập , tạo tài khoản thành công"
                    }
                } else {
                    return {
                        message: "Tạo tài khoản thất bại"
                    }
                }
            }
        } catch (error) {
            return {
                error
            }
        }
    }

    async updatePassword(passInfo: { userId: number, old: string, new: string }) {
        try {
            const data = await this.prisma.users.findFirst({
                where: {
                    id: passInfo.userId
                }
            })
            if (compareSync(passInfo.old, data.password)) {
                await this.prisma.users.update({
                    where: {
                        id: passInfo.userId
                    },
                    data: {
                        password: hashSync(passInfo.new, 5)
                    }
                })

                //---
                // console.log("passInfo", passInfo);
                // console.log("passInfo.userId", passInfo.userId);

                // console.log("data.password", data.password);
                console.log("passInfo.old", passInfo.old);
                console.log("passInfo.new", passInfo.new);
                console.log("Thay đổi mật khẩu thành công");



                return {
                    message: "Thay đổi mật khẩu thành công",
                    result: true,
                    data
                }
            } else {
                return {
                    message: "Mật khẩu cũ không đúng, nếu bạn là tài khoản đăng ký bằng Google mời quý khách liên hệ hỗ trợ để thiết lập lại mật khẩu",
                    result: false
                }
            }
        } catch (error) {
            return { error }
        }
    }

    //----
    // async updatePhoneUser(phoneInfor: { userId: number, old: string, new: string }) {
    //     try {
    //         const data = await this.prisma.users.findFirst({
    //             where: {
    //                 id: phoneInfor.userId
    //             }
    //         })
    //         if (compareSync(phoneInfor.old, data.phone)) {
    //             await this.prisma.users.update({
    //                 where: {
    //                     id: phoneInfor.userId
    //                 },
    //                 data: {
    //                     phone: phoneInfor.new
    //                 }
    //             })

    //             //---
    //             console.log("phoneInfor.old", phoneInfor.old);
    //             console.log("phoneInfor.new", phoneInfor.new);
    //             console.log("Thay đổi SĐT thành công");

    //             return {
    //                 message: "Thay đổi SĐT thành công",
    //                 result: true,
    //                 data
    //             }
    //         } else {
    //             //---
    //             console.log("SĐT không đúng, nếu bạn là tài khoản đăng ký bằng Google mời quý khách liên hệ hỗ trợ để thiết lập lại SĐT");

    //             return {
    //                 message: "SĐT không đúng, nếu bạn là tài khoản đăng ký bằng Google mời quý khách liên hệ hỗ trợ để thiết lập lại SĐT",
    //                 result: false
    //             }
    //         }
    //     } catch (error) {
    //         return { error }
    //     }
    // }

    // Tiếp tục trong class UsersService

// async updatePhoneUser(userId: number, newPhone: string) {
//     try {
//         const updatedUser = await this.prisma.users.update({
//             where: {
//                 id: userId
//             },
//             data: {
//                 phone: newPhone
//             }
//         });
//         return {
//             message: "Cập nhật số điện thoại thành công",
//             data: updatedUser
//         };
//     } catch (error) {
//         return {
//             message: "Cập nhật số điện thoại thất bại",
//             error: error
//         };
//     }
// }

// async updatePhone(userId: number, newPhone: string) {
//     try {
//       const updatedUser = await this.prisma.users.update({
//         where: { id: userId },
//         data: { phone: newPhone },
//       });
//       return { message: 'Phone number updated successfully', data: updatedUser };
//     } catch (error) {
//       return { message: 'Failed to update phone number', error };
//     }
//   }


    async topUp(info: { email: string, amount: number }) {
        try {
            const result = await this.prisma.users.update({
                where: {
                    email: info.email
                },
                data: {
                    wallet: { increment: info.amount }
                }
            })
        } catch (error) {

        }
    }
}
