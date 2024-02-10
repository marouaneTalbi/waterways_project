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
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\EstablishmentController;
use App\Controller\ProviderBoatsController;

#[ORM\Entity(repositoryClass: EstablishmentRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['establishment:read', 'user:read', 'media_object:read']],
        ),
        new Post(
            name: 'Establishment', 
            uriTemplate: '/addestablishment', 
            controller: EstablishmentController::class,
            normalizationContext: ['groups' => ['establishment:create']],

         ),
         new Get(
            uriTemplate: '/establishments/{id}',
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROVIDER')",
            normalizationContext: ['groups' => ['establishment:read', 'user:read']],
        ),
        new Get(
            uriTemplate: '/establishment/boats/{id}',
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROVIDER')",
            controller: ProviderBoatsController::class,
            normalizationContext: ['groups' => ['establishment:read', 'user:read']],
        ),
        new Put(
            denormalizationContext: ['groups' => ['establishment:update']], 
            controller: EstablishmentController::class, 
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROVIDER')",
            securityMessage: "Only authenticated users can modify users."
        ),
     /*   new Get(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['establishment:read']],
        ),
        new Put(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: "Only authenticated users can modify users."
        ),
      
        new Delete(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: "Only authenticated users can delete users."
        ),*/

    ],
    normalizationContext: ['groups' => ['establishment:read', 'user:read', 'media_object:read']],
    denormalizationContext: ['groups' => ['establishment:create', 'establishment:update']],
)]
class Establishment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['establishment:read', 'boat:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'establishment:create', 'establishment:update', 'boat:read', 'boat:create'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['establishment:read', 'establishment:create', 'establishment:update', 'boat:read', 'boat:create'])]
    private ?string $address = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['establishment:read', 'establishment:create', 'establishment:update'])]
    private ?\DateTimeInterface $startDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['establishment:read', 'establishment:create', 'establishment:update'])]
    private ?\DateTimeInterface $endDate = null;

    #[ORM\OneToMany(mappedBy: 'establishment', targetEntity: Boat::class)]
    private Collection $boats;

    #[ORM\ManyToOne(inversedBy: 'establishments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['media_object:read'])]
    private ?User $createdby = null;

    #[ORM\Column(length: 100)]
    #[Groups(['establishment:read', 'establishment:create', 'establishment:update', 'boat:read', 'boat:create'])]
    private ?string $city = null;

    public function __construct()
    {
        $this->boats = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Boat>
     */
    public function getBoats(): Collection
    {
        return $this->boats;
    }

    public function addBoat(Boat $boat): static
    {
        if (!$this->boats->contains($boat)) {
            $this->boats->add($boat);
            $boat->setEstablishment($this);
        }

        return $this;
    }

    public function removeBoat(Boat $boat): static
    {
        if ($this->boats->removeElement($boat)) {
            // set the owning side to null (unless already changed)
            if ($boat->getEstablishment() === $this) {
                $boat->setEstablishment(null);
            }
        }

        return $this;
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
  
    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }
}
