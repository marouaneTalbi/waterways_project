<?php

namespace App\Repository;

use App\Entity\Kbis;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Kbis>
 *
 * @method Kbis|null find($id, $lockMode = null, $lockVersion = null)
 * @method Kbis|null findOneBy(array $criteria, array $orderBy = null)
 * @method Kbis[]    findAll()
 * @method Kbis[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class KbisRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Kbis::class);
    }

//    /**
//     * @return Kbis[] Returns an array of Kbis objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('k')
//            ->andWhere('k.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('k.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Kbis
//    {
//        return $this->createQueryBuilder('k')
//            ->andWhere('k.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
