<?php

namespace App\Controller;

use App\Repository\KbisRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class GetKbis extends AbstractController
{
    private SerializerInterface $serializer;
    private KbisRepository $kbisRepository;

    public function __construct(SerializerInterface $serializer, KbisRepository $kbisRepository)
    {
        $this->kbisRepository = $kbisRepository;
        $this->serializer = $serializer;
    }

    public function __invoke()
    {
        $user = $this->getUser();
        if (!$user) {
            return new Response(null, Response::HTTP_FORBIDDEN);
        }
        $myDemand = $this->kbisRepository->findOneBy(['createdby' => $user->getId()]);
        if (!$myDemand){
            return new Response(null, Response::HTTP_NOT_FOUND);
        }
        return $myDemand;
    }
}
