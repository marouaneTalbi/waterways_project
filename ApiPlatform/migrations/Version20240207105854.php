<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240207105854 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE note_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE note (id INT NOT NULL, boat_id INT NOT NULL, proprete INT NOT NULL, confort INT NOT NULL, performance INT NOT NULL, equipement INT NOT NULL, nombre_de_votes INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_CFBDFA14A1E84A29 ON note (boat_id)');
        $this->addSql('ALTER TABLE note ADD CONSTRAINT FK_CFBDFA14A1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE note_id_seq CASCADE');
        $this->addSql('ALTER TABLE note DROP CONSTRAINT FK_CFBDFA14A1E84A29');
        $this->addSql('DROP TABLE note');
    }
}
