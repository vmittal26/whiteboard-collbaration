import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const HomeWrapper = styled.div`
display:flex;
flex-direction: column;
height: 100vh;
`

export const Form = styled.div`
display:flex;
border:1px solid gray;
padding:1rem;
justify-content: space-between;
width: 30%;
height: 25vh;
margin:auto;
flex-direction: column;
`

const Home = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [userName, setUsername] = useState('');
    const createNewRoom = (e:any) => {
        const id = uuidV4();
        setRoomId(id);
    };

    const joinRoom = () => {
        if (!roomId || !userName) {
            return;
        }

        // Redirect
        navigate(`/whiteboard/${roomId}`, {
            state: {
                userName,
            },
        });
    };

    const onEnterRoomId = (e:any) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };
    return (
        <HomeWrapper>
                <Form>
                    <input
                        type="text"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={onEnterRoomId}
                    />
                    <input
                        type="text"
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)}
                        value={userName}
                        onKeyUp={onEnterRoomId}
                    />
                    <button onClick={joinRoom}>
                        Join
                    </button>
                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <button
                            onClick={createNewRoom}
                            className="createNewBtn"
                        >
                            new room
                        </button>
                    </span>
                </Form>
        </HomeWrapper>
    );
};

export default Home;