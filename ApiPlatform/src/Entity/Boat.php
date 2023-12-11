<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BoatRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BoatRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['boat:read']],
        ),
        new Post(
            name: 'boat',
            uriTemplate: '/addboat',
            normalizationContext: ['groups' => ['boat:create']],
         ),
     /*   new Get(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['boat:read']],
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
    normalizationContext: ['groups' => ['boat:read']],
    denormalizationContext: ['groups' => ['boat:create', 'boat:update']],
)]
class Boat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['boat:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['boat:read', 'boat:create', 'boat:update'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['boat:read', 'boat:create', 'boat:update'])]
    private ?string $modele = null;

    #[ORM\Column]
    #[Groups(['boat:read', 'boat:create', 'boat:update'])]
    private ?float $size = null;

    #[ORM\Column]
    #[Groups(['boat:read', 'boat:create', 'boat:update'])]
    private ?int $capacity = null;

    #[ORM\ManyToOne(inversedBy: 'boats')]
    #[Groups(['boat:read', 'boat:create', 'boat:update'])]
    private ?Establishment $establishment = null;

    #[ORM\Column]
    #[Groups(['boat:read', 'boat:create', 'boat:update'])]
    private ?int $minTime = 0;

    #[ORM\OneToMany(mappedBy: 'idBoat', targetEntity: Slot::class, orphanRemoval: true)]
    private Collection $slots;

    public function __construct()
    {
        $this->slots = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        xdebug_break();
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getModele(): ?string
    {
        return $this->modele;
    }

    public function setModele(string $modele): static
    {
        $this->modele = $modele;

        return $this;
    }

    public function getSize(): ?float
    {
        return $this->size;
    }

    public function setSize(float $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): static
    {
        $this->capacity = $capacity;

        return $this;
    }

    public function getEstablishment(): ?Establishment
    {
        return $this->establishment;
    }

    public function setEstablishment(?Establishment $establishment): static
    {
        $this->establishment = $establishment;

        return $this;
    }

    public function getMinTime(): ?int
    {
        return $this->minTime;
    }

    public function setMinTime(int $minTime): static
    {
        $this->minTime = $minTime;

        return $this;
    }

    /**
     * @return Collection<int, Slot>
     */
    public function getSlots(): Collection
    {
        return $this->slots;
    }

    public function addSlot(Slot $slot): static
    {
        if (!$this->slots->contains($slot)) {
            $this->slots->add($slot);
            $slot->setIdBoat($this);
        }

        return $this;
    }

    public function removeSlot(Slot $slot): static
    {
        if ($this->slots->removeElement($slot)) {
            // set the owning side to null (unless already changed)
            if ($slot->getIdBoat() === $this) {
                $slot->setIdBoat(null);
            }
        }

        return $this;
    }

}
