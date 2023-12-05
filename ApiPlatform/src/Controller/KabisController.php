<?php

namespace App\Controller;

use App\Entity\Kabis;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class KabisController extends AbstractController
{
    public function __invoke(Request $request): Kabis
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $user = $this->getUser();
        if (!$user) {
            $user = 11;
        }
        
        $kabis = new Kabis();
        $kabis->setUserId($user);
        $kabis->file = $uploadedFile;

        return $kabis;
    }
}