import { useContext, useState } from 'react';

import { Box, colors, styled } from '@mui/material';
import { Chat as MessageIcon } from '@mui/icons-material';

import { AccountContext } from '../../../context/AccountProvider';

//components
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../drawer/Drawer';

const Component = styled(Box)`
    height: 44px;
    background: black;
    display: flex;
    padding: 8px 16px 0px 16px;
    align-items: center;
`;

const Wrapper = styled(Box) `
    margin-left: auto;
    & > * {
        margin-left: 2px;
        padding: 8px;
        color: #000;
    };
    & :first-child {
        font-size: 42px;
        margin-right: 8px;
        margin-top: 3px;
    }
`;
    
const Image = styled('img') ({
    height: 40,
    width: 40,
    borderRadius: '50%',
    boxShadow: '-1px 1px 7px rgba(255, 255, 255, 0.4),1px 1px 7px rgba(255, 255, 255, 0.4)'
})

const Header = () => {
    
    const [openDrawer, setOpenDrawer] = useState(false);

    const { account } = useContext(AccountContext);
    
    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

    return (
        <>
            <Component>
                <Image src={account.picture} onClick={() => toggleDrawer()} />
                <Wrapper>
                    <MessageIcon sx={{color:'white'}}/>
                    <HeaderMenu />
                </Wrapper>
            </Component>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
        </>
    )
}

export default Header;