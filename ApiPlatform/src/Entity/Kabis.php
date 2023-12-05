<?php

namespace App\Entity;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\KabisRepository;
use App\Controller\KabisController;
use App\Controller\KabisUpdateController;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\OpenApi\Model;
use ApiPlatform\Metadata\ApiProperty;
use Doctrine\ORM\Mapping as ORM;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: KabisRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['media_object:read']], 
    operations: [
        new Post(
            controller: KabisController::class, 
            deserialize: false, 
        ),
        new Get,
        new Put(
            controller: KabisUpdateController::class,
            deserialize: false,
        ),
        new GetCollection()
    ]
)]


class Kabis
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['media_object:read'])]
    private ?int $id = null;

    #[Groups(['media_object:read'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Vich\UploadableField(mapping: 'kabis', fileNameProperty: 'name')]
    public ?File $file = null;

    //#[ORM\ManyToOne(targetEntity: User::class)]
    //#[ORM\JoinColumn(name: "user_id", referencedColumnName: "id")]
    private $user;

    #[Groups(['media_object:read'])]
    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    #[Groups(['media_object:read'])]
    #[ORM\Column]
    private ?int $user_id = null;

    #[ORM\Column]
    #[Groups(['media_object:read'])]
    private ?int $status = 0;

    #[Groups(['media_object:read'])]
    public function getUserFirstname(): ?string
    {
        return $this->user ? $this->user->getFirstname() : null;
    }

    #[Groups(['media_object:read'])]
    public function getUserLastname(): ?string
    {
        return $this->user ? $this->user->getLastname() : null;
    }

    #[Groups(['media_object:read'])]
    public function getUserEmail(): ?string
    {
        return $this->user ? $this->user->getEmail() : null;
    }


    #[Groups(['media_object:read'])]
    public function isIsVerified(): ?bool
    {
        return $this->user ? $this->user->isIsVerified() : false;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): void
    {
        $this->file = $file;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function setUserId(int $user_id): static
    {
        $this->user_id = $user_id;
        return $this;
    }
    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): static
    {
        $this->status = $status;
        return $this;
    }
    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
