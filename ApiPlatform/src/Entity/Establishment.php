<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\EstablishmentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\EstablishmentController;



#[ORM\Entity(repositoryClass: EstablishmentRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['establishment:read']],
        ),
        new Post(
            name: 'Establishment', 
            uriTemplate: '/addestablishment', 
            controller: EstablishmentController::class,
            normalizationContext: ['groups' => ['establishment:create']],

         ),
     /*   new Get(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['establishment:read']],
        ),
        new Put(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: "Only authenticated users can modify users."
        ),
        new Patch(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: "Only authenticated users can modify users."
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: "Only authenticated users can delete users."
        ),*/

    ],
    normalizationContext: ['groups' => ['establishment:read']],
    denormalizationContext: ['groups' => ['establishment:create', 'establishment:update']],

)]
class Establishment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'establishment:create', 'establishment:update'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'establishment:create', 'establishment:update'])]
    private ?string $address = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['establishment:read', 'establishment:create', 'establishment:update'])]
    private ?\DateTimeInterface $startDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['establishment:read', 'establishment:create', 'establishment:update'])]
    private ?\DateTimeInterface $endDate = null;

    #[ORM\ManyToOne(inversedBy: 'establishments')]
    #[Groups(['establishment:read', 'establishment:create', 'establishment:update'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $userId;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): static
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): static
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->userId;
    }

    public function setUser(?User $userId): static
    {
        $this->userId = $userId;

        return $this;
    }
}