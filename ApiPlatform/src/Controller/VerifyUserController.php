<?php
namespace App\Controller;

use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\State\UserPasswordHasher;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use ApiPlatform\Metadata\ApiResource;

class VerifyUserController extends AbstractController
{

    private $params;
    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
    }
    #[Route('/verify/{token}', name: 'user_verify', methods: ['GET'])]
    public function __invoke(string $token, EntityManagerInterface $em): RedirectResponse
    {

        $user = $em->getRepository(User::class)->findOneBy(['token' => $token]);
        if ($user) {
            $user->setVerified(true);
            $em->flush();


            return new RedirectResponse($_ENV['FRONT_SERVER']);
        }

        return new RedirectResponse($_ENV['FRONT_SERVER']);

    }
}
