import styled from 'styled-components';

export const H2Info = styled.h2`
    color: #9a9a9a;
    text-align: center;
    font-size:20px;
`;
export const HotelBodyCenter = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height: 80%;
`;
export const HotelBody = styled.div`
    height: 80%;
`;
export const BoxInfo = styled.div`
    width: 200px;
    height: 250px;
    border-radius:10px;
    background: #ebebeb;
    padding: 15px;
    margin: 0 16px 15px 0;
`;
export const Image = styled.img`
    width: 170px;
    height: 110px;
    border-radius:6px;
    margin-bottom:10px;
`;
export const H1Grey = styled.h1`
    font-size:20px;
    color: #9a9a9a;
    margin-bottom:20px;
`;
export const H1Black = styled.h1`
    font-size:20px;
    color: black;
`;
export const HotelBodyInner =  styled.div`
    width:100%;
    height:100%;
    display: flex;
    flex-wrap: wrap;
    overflow-y:scroll;
`;
export const DivRooms = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const BoxRoomsStyle =`
    width: 165px;
    height: 40px;
    border-radius: 8px;
    border:1px solid #dddddd;
    display: flex;
    justify-content: space-between;
    align-items:center;
    padding: 0 10px;
    font-size: 17px;
    margin: 5px 10px;
    cursor: pointer;
`;
//ajeitar a font depois

export const BoxRooms = styled.div`
    ${BoxRoomsStyle}
    color: #595757;
    &: hover{
        background: #FDEED2;
    }
`;
export const BoxRoomsFull = styled.div`
    ${BoxRoomsStyle}
    background: #F1F1F1;
    color: gray;
`;
export const BoxRoomsSelected = styled.div`
    ${BoxRoomsStyle}
    background: #FDEED2;
    color: #595757;
`;
export const ButtonReserve = styled.div`
    width: 165px;
    height: 40px;
    background: #e0e0e0;
    border-radius: 5px;
    border:1px solid transparent;
    box-shadow: 0 0 10px -4px gray;
    margin:40px 0 0 10px;
    cursor: pointer;
    &: hover{
        background: #d1cdca;
        box-shadow: 0 0 10px -4px #595959;
    }
`;

export const iconPerson = <ion-icon name='person-outline' style = {{ fontSize: '20px', marginLeft: '4px' }}></ion-icon>;

export const iconPersonPink = <ion-icon name='person' style = {{ color: '#E75E90', fontSize: '20px', marginLeft: '4px' }}></ion-icon>;

export const iconPersonGray = <ion-icon name='person' style = {{ color: 'gray', fontSize: '20px', marginLeft: '4px' }} ></ion-icon>;

export const iconPersonBlack = <ion-icon name='person' style = {{ color: 'black', fontSize: '20px', marginLeft: '4px' }}></ion-icon>;
