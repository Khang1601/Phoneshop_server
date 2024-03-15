import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
    try {
        // await prisma.departments.createMany({
        //     data: [{
        //         id: 1,
        //         department: "Giám đốc",
        //         createAt: String(Date.now()),
        //         updateAt: String(Date.now()),
        //     }, {
        //         id: 2,
        //         department: "Quản lý",
        //         createAt: String(Date.now()),
        //         updateAt: String(Date.now()),
        //     }, {
        //         id: 3,
        //         department: "Quản trị viên",
        //         createAt: String(Date.now()),
        //         updateAt: String(Date.now()),
        //     }]
        // })

        await prisma.admins.createMany({
            data: [
                {
                    username: 'admin01',
                    password: hashSync("123", 3),
                    department: 2,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                },
                {
                    username: 'admin02',
                    password: hashSync("123", 3),
                    department: 2,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now())
                }
            ]
        })

        await prisma.users.createMany({
            data: [
                {
                    email: "cat@gmail.com",
                    email_verify: true,
                    password: hashSync("123", 3),
                    status: true,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    phone: "823-780-4054",
                    avatar: "https://png.pngtree.com/png-clipart/20230511/ourmid/pngtree-isolated-cat-on-white-background-png-image_7094927.png"
                },
                {
                    email: "dog@gmail.com",
                    email_verify: true,
                    password: hashSync("123", 3),
                    status: true,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    phone: "123456789",
                    avatar: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL3N0YXJ0dXBpbWFnZXNfcGhvdG9fb2ZfZG9nX2dpdmluZ19wYXdfb25fbGlnaHRfYmFja2dyb3VuZF82YWQ3ODk2Ny0xNGUzLTQyYzgtOWExNy03N2VlNzlkYzY1MGYucG5n.png"
                }
            ]
        })

        await prisma.brands.createMany({
            data: [{
                brandName: 'IPhone',
                brandLogo: "https://theme.hstatic.net/1000370129/1000843061/14/new_collection_mb_brand_1.png?v=1712",
                brandChoicePic: "https://theme.hstatic.net/1000370129/1000843061/14/new_collection_mb_brand_1.png?v=1712",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            },{
                brandName: 'SAMSUNG',
                brandLogo: "https://theme.hstatic.net/1000370129/1000843061/14/new_collection_mb_brand_2.png?v=1712",
                brandChoicePic: "https://theme.hstatic.net/1000370129/1000843061/14/new_collection_mb_brand_2.png?v=1712",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            },{
                brandName: 'Xiaomi',
                brandLogo: "https://theme.hstatic.net/1000370129/1000843061/14/new_collection_mb_brand_5.png?v=1712",
                brandChoicePic: "https://theme.hstatic.net/1000370129/1000843061/14/new_collection_mb_brand_5.png?v=1712",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            },
            {
                brandName: 'Pixel',
                brandLogo: "https://theme.hstatic.net/1000370129/1000843061/14/new_collection_mb_brand_4.png?v=1712",
                brandChoicePic: "https://theme.hstatic.net/1000370129/1000843061/14/new_collection_mb_brand_4.png?v=1712",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            },
            {
                brandName: 'OPPO',
                brandLogo: "https://logo-logos.com/2016/10/Oppo_logo.png",
                brandChoicePic: "https://logo-logos.com/2016/10/Oppo_logo.png",
                createAt: String(Date.now()),
                updateAt: String(Date.now()),

            },
            ]
        })

        await prisma.material.createMany({
            data: [{
                material: 'Nhựa Plastic',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                material: 'Kính',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                material: 'Gốm',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            },{
                material: 'Khác',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }]
        })

        await prisma.madeBy.createMany({
            data: [{
                country: 'Trung Quốc',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            },{
                country: 'Việt Nam',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                country: 'Nhật Bản',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }, {
                country: 'Khác',
                createAt: String(Date.now()),
                updateAt: String(Date.now()),
            }]
        })

        await prisma.categories.createMany({
            data: [
                {
                    categoryName: "Android",
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Android_14-Hero_image-P8P.width-1300.png"
                }
                ,
                {
                    categoryName: "IOS",
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar: "https://didongviet.vn/dchannel/wp-content/uploads/2023/01/ios-17-didongviet@2x.jpg"
                }
            ]
        })

        await prisma.products.createMany({
            data: [
                {
                    productName: "iPhone 15 Pro Max",
                    namefield: "iPhone 15 Pro Max",
                    material: 1,
                    madeBy: 2,
                    categoryId: 2,
                    price: 30290000,
                    brand: 1,
                    status: true,
                    bestSeller: true,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar: "https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/10/30/638342508308826366_ip-15-dd-bh-2-nam.jpg"
                },
                {
                    productName: "Samsung Galaxy S24 Ultra",
                    namefield: "Samsung Galaxy S24 Ultra",
                    material: 2,
                    madeBy: 2,
                    categoryId: 1,
                    price: 30490000,
                    brand: 2,
                    status: true,
                    bestSeller: true,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar: "https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/3/1/638449091684440211_samsung-galaxy-s24-ultral-dd-bh.jpg"
                }
                ,
                {
                    productName: "Xiaomi 13T",
                    namefield: "Xiaomi 13T",
                    material: 2,
                    madeBy: 1,
                    categoryId: 1,
                    price: 11180000,
                    brand: 3,
                    status: true,
                    bestSeller: true,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar: "https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/11/8/638350317315676088_xiaomi-13t-dd-bh-24-thang.jpg"
                }
                ,
                {
                    productName: "OPPO Find N3",
                    namefield: "OPPO Find N3",
                    material: 3,
                    madeBy: 1,
                    categoryId: 1,
                    price: 41990000,
                    brand: 4,
                    status: true,
                    // bestSeller: true,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar: "https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/12/4/638372781579679832_oppo-find-n3-5g-vang-dd.jpg"
                }
            ]
        })
    } catch (error) {

    }


}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })