import React, { useState } from 'react';
import sendRequest from "../../services/axiosRequestFunction";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Button, Card, Label, TextInput } from 'flowbite-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    e.preventDefault();
    
    if (email === '' || password === '' || firstname === '' || lastname === '') {
        toast.error('Veuillez remplir tous les champs', {
            position: toast.POSITION.TOP_RIGHT,
        });
        return;
    }

    if (!EmailRegex.test(email)) {
      toast.error('Veuillez mettre un email valide', {
          position: toast.POSITION.TOP_RIGHT,
      });
      return;
  }

    if (!passwordRegex.test(password)) {
      toast.error('Veuillez mettre un mot de passe valide', {
          position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
   
    try {
      sendRequest(
        '/api/users',
        'post',
        {
          email: email,
          plainPassword: password,
          firstname: firstname,
          lastname: lastname
        },
        false
      ).then(response =>
          navigate("/Login"))
        .catch(error => console.error("Erreur lors de l'inscription:", error));
    } catch (error) {
      toast.error("Username ou mot de passe incorrect",  {
          position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  return (
    <div className="flex justify-center w-full">
            <ToastContainer />
            <Card className="h-fit w-[95%] sm:w-[90%] md:w-[80%]">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <h3 className="font-semibold text-2xl">S'inscrire</h3>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="firstname" value="Votre prénom" />
                        </div>
                        <TextInput id='firstname' placeholder='Prénom' type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="lastname" value="Votre nom" />
                        </div>
                        <TextInput id="lastname" placeholder='Nom' type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Votre email" />
                        </div>
                        <TextInput id="email" placeholder='Email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Votre mot de passe" />
                        </div>
                        <TextInput id="password" placeholder='Mot de passe' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <Button type="submit" color="blue">Inscription</Button>
                </form>
            </Card>
        </div>
    // <div>
    //   <h2>Page d'inscription</h2>
    //   <ToastContainer />
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Nom :</label>
    //       <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>Prenom :</label>
    //       <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>Email :</label>
    //       <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
    //     </div>
    //     <div>
    //       <label>Mot de passe :</label>
    //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //     </div>
    //     <button type="submit">S'inscrire</button>
    //   </form>
    // </div>
  );
};

export default Register;
