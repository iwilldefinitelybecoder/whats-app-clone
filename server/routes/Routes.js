import express from 'express';


import { newConversation, getConversation, getAllConversation } from '../controller/conversation-controller.js';
import { addUser, getUser } from '../controller/user-controller.js';
import { newMessage, getMessage, deleteMessage }from '../controller/message-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';

import upload from '../utils/upload.js';
import { getUserActivity, updateUserActivity } from '../controller/UserActivity-controller.js';

const route = express.Router();

route.post('/add', addUser);
route.get('/users', getUser);

route.post('/conversation/add', newConversation);
route.post('/conversation/get', getConversation);
route.post('/conversation/getall', getAllConversation);

route.post('/message/add', newMessage);
route.get('/message/get/:id', getMessage);
route.post('/message/delete', deleteMessage)
route.post('/userActivity/update', updateUserActivity)

route.post('/file/upload', upload.single('file'), uploadImage);
route.get('/file/:filename', getImage);

route.post('/update/lastUpConvoActivity',updateUserActivity)
route.get('/get/lastUpConvoActivity/:id',getUserActivity)

export default route;