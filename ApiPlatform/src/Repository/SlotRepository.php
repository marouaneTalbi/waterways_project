<?php

namespace App\Repository;

use App\Entity\Slot;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Reservation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<Slot>
 *
 * @method Slot|null find($id, $lockMode = null, $lockVersion = null)
 * @method Slot|null findOneBy(array $criteria, array $orderBy = null)
 * @method Slot[]    findAll()
 * @method Slot[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SlotRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Slot::class);
    }

    public function findSlotsForReservation(Reservation $reservation, \DateTimeInterface $date): array
    {
        return $this->createQueryBuilder('s')
            ->join('s.reservations', 'r')
            ->where('s.startBookingDate >= :date')
            ->andWhere('r = :reservation')
            ->setParameter('date', $date)
            ->setParameter('reservation', $reservation)
            ->getQuery()
            ->getResult();
    }

    public function findSlotsForHistory(Reservation $reservation, \DateTimeInterface $date): array
    {
        return $this->createQueryBuilder('s')
            ->join('s.reservations', 'r')
            ->where('s.startBookingDate < :date')
            ->andWhere('r = :reservation')
            ->setParameter('date', $date)
            ->setParameter('reservation', $reservation)
            ->getQuery()
            ->getResult();
    }

//    /**
//     * @return Slot[] Returns an array of Slot objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('s.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Slot
//    {
//        return $this->createQueryBuilder('s')
//            ->andWhere('s.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
