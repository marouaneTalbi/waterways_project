<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231206091659 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE boat_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE boat (id INT NOT NULL, establishment_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, modele VARCHAR(255) NOT NULL, size DOUBLE PRECISION NOT NULL, capacity INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D86E834A8565851 ON boat (establishment_id)');
        $this->addSql('ALTER TABLE boat ADD CONSTRAINT FK_D86E834A8565851 FOREIGN KEY (establishment_id) REFERENCES establishment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE boat_id_seq CASCADE');
        $this->addSql('ALTER TABLE boat DROP CONSTRAINT FK_D86E834A8565851');
        $this->addSql('DROP TABLE boat');
    }
}
