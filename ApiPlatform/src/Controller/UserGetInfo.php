<?php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class UserGetInfo extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager, $id): User
    {

        dd('test');
        $user = $entityManager->getRepository(User::class)->find($id);

        if (!$user) {
            return $this->json(['message' => 'Utilisateur non trouvé'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['roles'])) {
            return $this->json(['message' => 'pas autorisé de modifier le role'], Response::HTTP_NOT_FOUND);
        }
        
        if (isset($data['nom'])) {
            $user->setLastname($data['nom']);
        }
        if (isset($data['prenom'])) {
            $user->setFirstname($data['prenom']);
        }
        if (isset($data['telephone'])) {
            $user->setPhone($data['telephone']);
        }
        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }

        $entityManager->flush();

        return $user;
    }
}
