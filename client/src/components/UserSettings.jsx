import React, {useEffect} from 'react';
import {useState} from "react";
import "../settingsFormStyles.css"
import {useCurrentUser} from "../hooks/useCurrentUser.js";

function UserSettings() {
    const {getUserData} = useCurrentUser()
    const [userId, setUserId] = useState(0)

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        getUserData().then(data => {
            setUserId(data.id)
            setEmail(data.email ?? '')
            setNickname(data.username ?? '')
            setName(data.name ?? '')
            setDescription(data.description ?? '')
        }).catch(err => {
            console.log("Error while getting user data: "+err)
        })
    }, []);

    function handleSave(){
        const url = `http://localhost:3000/api/users/${userId}`;
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                "name": name,
                "description": description,
                "username": nickname
            })
        };

        if (userId !== 0){
            fetch(url, requestOptions)
                .then(async response => {
                    let data;
                    try {
                        data = await response.json();
                    } catch (e) {
                        data = {"error": "Invalid response from server"};
                    }

                    if(!response.ok){
                        alert("Couldn't save user data. Details: "+data);
                    } else {
                        alert("Saved changed data");
                    }
                })
                .catch(error => {
                    alert("Couldn't save user data. Details: "+error);
                })
        } else {
            alert("User not logged in or couldn't fetch user data!")
        }

    }

    return (
        <div className='settings'>
            <h1>Settings</h1>
            <form onSubmit={handleSave}>
                <div>
                    <label>email</label>
                    <input type="email" readOnly={true} value={email} onChange={e => setEmail(e.target.value)}/>
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