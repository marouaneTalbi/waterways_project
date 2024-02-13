import React, { useContext } from 'react'
import { TextInput, Button } from 'flowbite-react' 
import { HiSearch, HiUser } from 'react-icons/hi';
import { UserContext } from '../../contexts/userContext'; 

export default function UserSearchForm({ initialValues = { lastname: '', firstname: '' } }) {

    const { searchUser } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        searchUser(data);
    }

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-row gap-2'>
            <div>
                <TextInput defaultValue={initialValues.lastname} name='lastname' size="lg"  id="lastname" type="text" icon={HiUser} placeholder="Nom" />
            </div>
            <div>
                <TextInput defaultValue={initialValues.firstname} name='firstname' size="sm" id="firstname" type="text" icon={HiUser} placeholder="Prénom" />
            </div>
            <div>
                <Button type='submit' color='blue' size="sm">
                    <HiSearch className="h-6 w-6" />
                </Button>
            </div>
        </form>
    )
}
