<?php
namespace App\Controller;
use App\Entity\Kbis;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class KbisController extends AbstractController
{
    public function __invoke(Request $request): Kbis
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }
        $user = $this->getUser();
        if (!$user) {
            throw new BadRequestHttpException('no user connected');
        }        
        $kbis = new Kbis();
        $kbis->setCreatedby($user);
        $kbis->setCreatedAt(new \DateTimeImmutable());
        $kbis->file = $uploadedFile;

        return $kbis;
    }
}