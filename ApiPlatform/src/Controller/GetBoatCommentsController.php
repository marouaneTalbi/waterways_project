<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use App\Repository\BoatRepository;
use Symfony\Component\Security\Core\Security;

class GetBoatCommentsController  extends AbstractController {

    private $userRepository;

    public function __construct(
        UserRepository $userRepository,
    ) {
        $this->userRepository = $userRepository;
    }

    public function __invoke(Request $request, BoatRepository $boatRepository)
    {
        // $userId = $request->get('userId');
        $boat = $boatRepository->find($request->get('id'));
        $comments = $boat->getComments();

        return $comments;
    }   
}