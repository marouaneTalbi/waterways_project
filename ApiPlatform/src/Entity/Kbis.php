<?php

namespace App\Entity;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\KbisRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\KbisController;
use App\Controller\KbisUpdateController;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\GetKbis;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: KbisRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['media_object:read']], 
    operations: [
        new Post(
            controller: KbisController::class, 
            deserialize: false, 
        ),
        new Put(
            controller: KbisUpdateController::class,
            deserialize: false,
        ),
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')",
        ),
        new GetCollection(
            uriTemplate: "/kbis/me",
            controller: GetKbis::class,
            name: 'getmydemand'
        ),
        new Get(
            security: "is_granted('ROLE_ADMIN')",
        ),
    ]
)]
class Kbis
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['media_object:read'])]
    private ?int $id = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[Groups(['media_object:read'])]
    private ?User $createdby = null;

    #[ORM\Column]
    #[Groups(['media_object:read'])]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['media_object:read'])]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\Column(length: 255)]
    #[Groups(['media_object:read'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['media_object:read'])]
    private ?int $status = 0;

    #[Vich\UploadableField(mapping: 'kbis', fileNameProperty: 'name')]
    public ?File $file = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedby(): ?User
    {
        return $this->createdby;
    }

    public function setCreatedby(?User $createdby): static
    {
        $this->createdby = $createdby;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

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

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): void
    {
        $this->file = $file;
    }
}
