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
use App\Repository\SlotRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\SlotController;
use Ramsey\Uuid\Type\Time;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: SlotRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['slots:read']],
            paginationEnabled: false,
            /*paginationItemsPerPage: 100,*/
        ),
        new Post(
            name: 'Slots',
            uriTemplate: '/slots',
            normalizationContext: ['groups' => ['slots:create']],

        ),
        new Get(
            normalizationContext: ['groups' => ['slots:read']],
        ),
        new Get(
            uriTemplate: '/slots/boats/{id}',
            requirements: ['id' => '\d+'],
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROVIDER')",
            normalizationContext: ['groups' => ['slots:read']],
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
    normalizationContext: ['groups' => ['slots:read']],
    denormalizationContext: ['groups' => ['slots:create', 'slots:update']],

)]
#[ApiResource]
class Slot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['slots:read', 'slots:create', 'reservation:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'slots')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['slots:read', 'slots:create', 'slots:update'])]
    private ?Boat $boat = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['slots:read', 'slots:create', 'slots:update', 'reservation:read'])]
    private ?\DateTimeInterface $startBookingDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['slots:read', 'slots:create', 'slots:update', 'reservation:read'])]
    private ?\DateTimeInterface $endBookingDate = null;

    #[ORM\OneToMany(mappedBy: 'slots', targetEntity: Reservation::class)]
    private Collection $reservations;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Groups(['slots:read', 'slots:create', 'slots:update', 'reservation:read'])]
    private ?\DateTimeInterface $startTime = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Groups(['slots:read', 'slots:create', 'slots:update', 'reservation:read'])]
    private ?\DateTimeInterface $endTime = null;

    public function __construct()
    {
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBoat(): ?Boat
    {
        return $this->boat;
    }

    public function setBoat(?Boat $boat): static
    {
        $this->boat = $boat;

        return $this;
    }

    public function getStartBookingDate(): ?\DateTimeInterface
    {
        return $this->startBookingDate;
    }

    public function setStartBookingDate(\DateTimeInterface $startBookingDate): static
    {
        $this->startBookingDate = $startBookingDate;

        return $this;
    }

    public function getEndBookingDate(): ?\DateTimeInterface
    {
        return $this->endBookingDate;
    }

    public function setEndBookingDate(\DateTimeInterface $endBookingDate): static
    {
        $this->endBookingDate = $endBookingDate;

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setSlots($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getSlots() === $this) {
                $reservation->setSlots(null);
            }
        }

        return $this;
    }

    public function getStartTime(): ?\DateTimeInterface
    {
        return $this->startTime;
    }

    public function setStartTime(\DateTimeInterface $startTime): static
    {
        $this->startTime = $startTime;

        return $this;
    }

    public function getEndTime(): ?\DateTimeInterface
    {
        return $this->endTime;
    }

    public function setEndTime(\DateTimeInterface $endTime): static
    {
        $this->endTime = $endTime;

        return $this;
    }
}
