<?php
namespace App\Controller;

use App\Entity\Kbis;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Doctrine\ORM\EntityManagerInterface;

#[AsController]
final class KbisUpdateController extends AbstractController
{
    public function __invoke(Request $request, Kbis $data, EntityManagerInterface $entityManager): Kbis
    {
        $requestData = json_decode($request->getContent(), true);
        if (isset($requestData['status'])) {
            $data->setStatus($requestData['status']);
        }
        $entityManager->persist($data);
        $entityManager->flush();

        return $data;
    }
}
