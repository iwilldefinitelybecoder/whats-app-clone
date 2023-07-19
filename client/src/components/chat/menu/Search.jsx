
import { Box, InputBase, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Component = styled(Box)`
    background: black;
    height: 45px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F2F2F2;
    padding:5px 2px 5px 2px
`;

const Wrapper = styled(Box)`
    position: relative;
    border-radius: 10px;
    background-color:#0b71ff;
    margin: 0 13px;
    width: 100%;
    color:white;
`;

const Icon = styled(Box)`
color:white;
    padding: 8px;
    height: 100%;
    position: absolute;
`;
      
const InputField = styled(InputBase) `
    width: 100%;
    padding: 16px;
    padding-left: 65px;
    font-size: 14px;
    height: 15px;
    width: 100%;
    color:white;
    border-radius:10px;
`;

const Search = ({ setText }) => {

    return (
        <Component>
            <Wrapper sx={{boxShadow:6}}>
                <Icon>
                    <SearchIcon fontSize="small"/>
                </Icon>
                <InputField
                    sx={{
                        boxShadow: '-px 1px 7px rgba(255, 255, 255, 0.4),1px 1px 7px rgba(255, 255, 255, 0.4)'
                        
                      }}
                    placeholder="Search or start new chat"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setText(e.target.value)}
                />
            </Wrapper>
        </Component>
    )
}

export default Search;