<?php

namespace App\Controller;

use App\Model\Translation;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Yaml\Yaml;

#[ApiResource(
    operations:[
        new GetCollection(
            uriTemplate : '/translations',
            controller : self::class,
        ),
    ]
)]

class TranslatorController extends AbstractController
{
    public function __construct(private TranslatorInterface $translator) {}

    #[Route('/translations', name: 'get_translations', methods: ['GET'])]
    public function __invoke(Request $request, KernelInterface $kernel): Response
    {
        $allowedLangs = ['en', 'fr']; 
        $lang = $request->query->get('lang', 'fr');
        if (!in_array($lang, $allowedLangs)) {
            return $this->json(['error' => 'Invalid language.'], Response::HTTP_BAD_REQUEST);
        }
        $translationsPath = $kernel->getProjectDir() . '/src/Translation/trans.' . $lang . '.yaml';

        if (!file_exists($translationsPath)) {
            return $this->json(['error' => 'File not found.'], Response::HTTP_NOT_FOUND);
        }

        $translations = Yaml::parse(file_get_contents($translationsPath));

        return $this->json($translations);
    }
}
