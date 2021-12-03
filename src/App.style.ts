import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

export const Wrapper = styled.div`
    margin: 40px;
`;

export const StyledButton = styled(IconButton)`
    position: fixed;
    z-index:100;
    right: 20px;
    top: 20px;

`;

export const Carousel = styled.div`
    max-width: 1000px;
    position: relative;
    margin: auto;

    .d-block w-100{
        

    }

`;