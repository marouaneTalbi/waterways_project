import React, { useEffect, useState } from 'react'
import DataCard from '../../components/DataCard/DataCard'
import { faEnvelope, faUser, faPhone, faFlask } from '@fortawesome/free-solid-svg-icons';
import GenericModal from '../../components/GenericModal/GenericModal';
import { TextInput, Label, Button } from 'flowbite-react';
import sendRequest from "../../services/axiosRequestFunction";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [highestRole, SethighestRole] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest(
      `/api/users/${user.id}`,
      'put',
      user,
      true
    ).then(response => {
      setUser({
        ...response,
        fullName: `${response.lastname} ${response.firstname}`
      });
      SethighestRole(getHighestRole(response.roles));
      handleCloseModal();
    }).catch(error => console.error("Erreur lors de l'inscription:", error));
  };

  async function getUser() {
    try {
      const response = await fetch('http://localhost:8888/api/user', {
        method: 'GET',
      })
      const data = await response.json()
      setUser({
        ...data,
        fullName: `${data.lastname} ${data.firstname}`
      });
      SethighestRole(getHighestRole(data.roles));
    } catch (error) {
      console.log(error)
    }
  }

  const getHighestRole = (roles) => {
    const roleOrder = ["ROLE_ADMIN", "ROLE_PROVIDER", "ROLE_USER"];
    for (const role of roleOrder) {
      if (roles.includes(role)) {
        return role;
      }
    }
    return null;
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "Administrateur";
      case "ROLE_USER":
        return "Client";
      case "ROLE_PROVIDER":
        return "Prestataire";
      default:
        return "";
    }
  };

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="grid grid-cols-12 gap-4 flex-1">
      <GenericModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Modifier mes informations"
      >
        <form onSubmit={handleSubmit}>
          {
            user && (
              <>
                <div className="mb-2 block">
                  <Label htmlFor="nom" value="Nom" />
                </div>
                <TextInput
                  id="nom"
                  value={user.lastname}
                  onChange={(event) => setUser((prevUser) => ({ ...prevUser, lastname: event.target.value }))}
                  required
                />
                <div className="mb-2 block">
                  <Label htmlFor="prenom" value="Prenom" />
                </div>
                <TextInput
                  id="prenom"
                  value={user.firstname}
                  onChange={(event) => setUser((prevUser) => ({ ...prevUser, firstname: event.target.value }))}
                  required
                />
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  value={user.email}
                  onChange={(event) => setUser((prevUser) => ({ ...prevUser, email: event.target.value }))}
                  required
                />
                <div className="mb-2 block">
                  <Label htmlFor="phone" value="Telephone" />
                </div>
                <TextInput
                  id="phone"
                  value={user.phone}
                  onChange={(event) => setUser((prevUser) => ({ ...prevUser, phone: event.target.value }))}
                />
                <div className="w-full">
                  <Button type='submit' color='red'>Modifier</Button>
                </div> 
              </>
            )
          }
        </form>
      </GenericModal>
      <div className="col-span-12 md:col-span-8 bg-white rounded border-2 border-gray-100 p-4 relative">
        <header className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-medium">Mes informations</h4>
          </div>
          <button className="text-base text-dark-orange underline cursor-pointer" onClick={handleOpenModal}>MODIFIER</button>
        </header>
          <div className="flex flex-wrap py-6 gap-20 gap-y-10">
            <DataCard title="email" value={user?.email} icon={faEnvelope} />
            <DataCard title="nom / prenom" value={user?.fullName} icon={faUser} />
            <DataCard title="telephone" value={user?.phone} icon={faPhone} />
            <DataCard title="compte" value={getRoleLabel(highestRole)} icon={faFlask} />
          </div>
          <div className="py-6 border-t border-gray-100 absolute bottom-0 w-[calc(100%_-_2rem)]">
            <a href="/requestProvider" className="text-dark-orange p-3 bg-light-orange rounded-lg">Deviens Prestataire</a>
          </div>
      </div>
      <div className="col-span-12 md:col-span-4 bg-white rounded border-1 border-gray-100 p-4">
        <header className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-medium">Réservation(s)</h4>
          </div>
        </header>
      </div>
      <div className="col-span-12 md:col-span-8 bg-white rounded border-2 border-gray-100 p-4">
        <header className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-medium">Historique de réservations</h4>
          </div>
        </header>
      </div>
    </div>
  )
}