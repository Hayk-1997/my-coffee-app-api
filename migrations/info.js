// // // Import the mongoose module
// // const  InfoModel  = require('../models/Info');
// // var mongoose = require('mongoose');
// // require('dotenv').config();
// // //Set up default mongoose connection
// // var mongoDB = process.env.MONGO_URI;
// // const options = {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // };
// // mongoose.set('useCreateIndex', true);
// // mongoose.connect(mongoDB, options);
// //
// // //Get the default connection
// // var db = mongoose.connection;
// // console.log(db);
// // //Bind connection to error event (to get notification of connection errors)
// // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// // // const  product =  db.createCollection('products',
// // //     {
// // //         size: Number,
// // //     }
// // // );
// // const newItem = {
// //     "size": 35,
// // };
// //
// // InfoModel.create( { item: "card", qty: 15 } )
// const mongoose = require('mongoose');
// const Info = require('../models/Info');
//
// // const icon = {
// //     item: {
// //         download_url: 'download_url',
// //         format: 'format',
// //         preview_url: 'preview_url',
// //     },
// //     size: 35,
// //     tags: ['tags1', 'tags2']
// // };
// //
// // const fields = {
// //     phone: {
// //         number: '094066112',
// //         description: 'phone Description',
// //         icon: {...icon},
// //     },
// //     address: {
// //         title: 'Address Title',
// //         description: 'Address Description',
// //         icon: {...icon},
// //     },
// //     workingHours: {
// //         title: 'Working Hours Title',
// //         description: 'Working Hours Description',
// //         icon: {...icon},
// //     },
// // };
//
// const data = {
//     en: {
//         phone: {
//             number: '094066112',
//             description: 'phone Description',
//             icon: {
//                 item: {
//                     download_url: 'download_url',
//                     format: 'format',
//                     preview_url: 'preview_url',
//                 },
//                 size: 35,
//                 tags: ['tags1', 'tags2']
//             },
//         },
//         address: {
//             title: 'Address Title',
//             description: 'Address Description',
//             icon: {
//                 item: {
//                     download_url: 'download_url',
//                     format: 'format',
//                     preview_url: 'preview_url',
//                 },
//                 size: 35,
//                 tags: ['tags1', 'tags2']
//             },
//         },
//         workingHours: {
//             title: 'Working Hours Title',
//             description: 'Working Hours Description',
//             icon: {
//                 item: {
//                     download_url: 'download_url',
//                     format: 'format',
//                     preview_url: 'preview_url',
//                 },
//                 size: 35,
//                 tags: ['tags1', 'tags2']
//             },
//         }
//     },
//     arm: {
//         phone: {
//             number: '094066112',
//             description: 'phone Description',
//             icon: {
//                 item: {
//                     download_url: 'download_url',
//                     format: 'format',
//                     preview_url: 'preview_url',
//                 },
//                 size: 35,
//                 tags: ['tags1', 'tags2']
//             },
//         },
//         address: {
//             title: 'Address Title',
//             description: 'Address Description',
//             icon: {
//                 item: {
//                     download_url: 'download_url',
//                     format: 'format',
//                     preview_url: 'preview_url',
//                 },
//                 size: 35,
//                 tags: ['tags1', 'tags2']
//             },
//         },
//         workingHours: {
//             title: 'Working Hours Title',
//             description: 'Working Hours Description',
//             icon: {
//                 item: {
//                     download_url: 'download_url',
//                     format: 'format',
//                     preview_url: 'preview_url',
//                 },
//                 size: 35,
//                 tags: ['tags1', 'tags2']
//             },
//         }
//     },
// };
//
// logger.info(data);
// // logger.error(data);
//
// // console.log(...data);
// // const created = new Info(data);
// // const save = created.save();
// // console.log(save);
