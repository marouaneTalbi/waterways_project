<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Security\Core\Security;

class GetFavoriteController  extends AbstractController {

    private $userRepository;

    public function __construct(
        UserRepository $userRepository,
    ) {
        $this->userRepository = $userRepository;
    }

    public function __invoke(Request $request, Security $security): Collection
    {
        // $userId = $request->get('userId');
        $authUser = $security->getUser();
        $user = $this->userRepository->findOneBy(['email' => $authUser->getUserIdentifier()]);

        if(!$user) {
            return new Response('user not found');
        }

        $favorite = $user->getFavorite();

        return $favorite;
    }   
}