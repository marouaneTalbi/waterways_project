<?php

namespace App\Controller;

use App\Entity\Boat;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\UserRepository;
use App\Repository\BoatRepository;
use Symfony\Component\Security\Core\Security;

class RemoveFavoriteController  extends AbstractController {

    private $boatRepository;
    private $userRepository;

    public function __construct(
        BoatRepository $boatRepository,
        UserRepository $userRepository,
    ) {
        $this->boatRepository = $boatRepository;
        $this->userRepository = $userRepository;
    }

    public function __invoke(Boat $data, Request $request, Security $security)
    {
        // $userId = $request->get('userId');
        $boatId = $request->get('id');
        $authUser = $security->getUser();
        $user = $this->userRepository->findOneBy(['email' => $authUser->getUserIdentifier()]);

        if(!$user) {
            return new Response('user not found');
        }
        $boat = $this->boatRepository->find($boatId);
        if(!$boat) {
            return new Response('boat not found');
        }

        $user->removeFavorite($boat);
        $this->userRepository->save($user, true);

        return 'succes';
    }   
}