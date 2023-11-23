<?php

namespace App\Repository;

use App\Entity\Kabis;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Kabis>
 *
 * @method Kabis|null find($id, $lockMode = null, $lockVersion = null)
 * @method Kabis|null findOneBy(array $criteria, array $orderBy = null)
 * @method Kabis[]    findAll()
 * @method Kabis[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class KabisRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Kabis::class);
    }

//    /**
//     * @return Kabis[] Returns an array of Kabis objects
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

//    public function findOneBySomeField($value): ?Kabis
//    {
//        return $this->createQueryBuilder('k')
//            ->andWhere('k.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
