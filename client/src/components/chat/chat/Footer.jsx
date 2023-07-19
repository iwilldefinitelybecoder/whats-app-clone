import { useContext, useEffect, useState } from 'react';

import { EmojiEmotions, AttachFile, Mic } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import EmojiPicker, {
    EmojiStyle,
    SkinTones,
    Theme,
    Categories,
    EmojiClickData,
    Emoji,
    SuggestionMode,
    SkinTonePickerLocation
  } from "emoji-picker-react";
import { uploadFile } from '../../../service/api';
import { deleteFunction } from './ChatBox';


const Container = styled(Box)`
    height: 35px;
    background: black;
    width: 100%;
    display: flex;
    align-items: center;
     padding:8px;
    margin-bottom:0;
    border-bottom-right-radius:8px;
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
    boxShadow: '-1px 1px 7px rgba(255, 255, 255, 0.4),1px 1px 7px rgba(255, 255, 255, 0.4)'
    
`;

const ClipIcon = styled(AttachFile)`
    transform: 'rotate(40deg)'
`;


const Footer = ({ sendText, value, setValue, setFile, file, setImage, setIsTyping }) => {

    const [toggleEmojiPannel,setToggleEmojiPannel] = useState(false)
   
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                try {
                    const response = await uploadFile(data);
                    setImage(response.data);
                } catch (error) {
                    console.log(error.message)
                }
                
            }
        }
        getImage();
    }, [file])

    const onEmojiClick = (EmojiClickData)=>{
        setValue(value + EmojiClickData.emoji);
        setToggleEmojiPannel(false)
    
        
    }
   
    function togglePicker(){
        if(toggleEmojiPannel ===false){
            setToggleEmojiPannel(true)
        }else{
            console.log('picker')
            setToggleEmojiPannel(false)
        }
    }

    const onFileChange = (e) => {
        setValue(e.target.files[0].name);

        setFile(e.target.files[0]);
    }

    const handleInputChange = (e) => {
        setValue(e.target.value)
        const value = e.target.value;
        setIsTyping(value !== '');
      };
    
      const handleInputBlur = () => {
        setIsTyping(false);
      };
    
      const handleInputFocus = () => {
        setIsTyping(true);
      };
    
      const handleKeyUp = () => {
        setIsTyping(false);
      };

    return (
        <Container>
            {toggleEmojiPannel && <EmojiPicker onEmojiSelect={(e)=>setValue(e.native)} onEmojiClick={onEmojiClick} pickerStyle={{position:'absolute',bottom:"60px"}} theme='dark'/>}
            <EmojiEmotions style={{color:'white'}} onClick={togglePicker}></EmojiEmotions>
            
            <label htmlFor="fileInput" style={{color:'white'}}>
                <ClipIcon />
            </label>
            <input
                type='file'
                id="fileInput"
                style={{ display: 'none' }}
                onChange={(e) => onFileChange(e)}
            />
{/**/}
            <Search>
                <InputField
                    placeholder="Type a message"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => {handleInputChange(e)}}
                    onKeyPress={(e) => sendText(e)}
                    value={value}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    onKeyUp={handleKeyUp}
                    sx={{ boxShadow: '-1px 1px 7px rgba(255, 255, 255, 0.4),1px 1px 7px rgba(255, 255, 255, 0.4)'}}
                />
            </Search>
            <Mic style={{color:'white'}} />
        </Container>
    )
}

export default Footer;