import React from 'react';
import {useState} from "react";

function UserSettings() {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [description, setDescription] = useState('');

    function handleSave(){
        //TODO: send data to server
        alert("Possibly changed data")
    }

    return (
        <div>
            {/*TODO: add styles*/}
            <h1>Settings</h1>
            <form>
                <div>
                    <label>email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>nickname</label>
                    <input type="text" value={nickname} onChange={e => setNickname(e.target.value)}/>
                </div>
                <div>
                    <label>name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div>
                    <label>lastName</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                </div>
                <div>
                    <label>address</label>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)}/>
                </div>
                <div>
                    <label>phoneNumber</label>
                    <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                </div>
                <div>
                    <label>gender</label>
                    <input type="text" value={gender} onChange={e => setGender(e.target.value)}/>
                </div>
                <div>
                    <label>description</label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                </div>
                <button type="submit">save</button>
            </form>
        </div>
    )
}
export default UserSettings