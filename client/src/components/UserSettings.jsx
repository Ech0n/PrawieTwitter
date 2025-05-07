import React from 'react';
import {useState} from "react";
import "../SettingsForm.css"

function UserSettings() {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [description, setDescription] = useState('');

    function handleSave(){
        //TODO: send data to server
        alert("Possibly changed data")
    }

    return (
        <div>
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
                    <label>description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className="buttonContainer">
                    <button type="submit">save</button>
                </div>

            </form>
        </div>
    )
}
export default UserSettings