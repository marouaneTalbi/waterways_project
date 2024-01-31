<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240130193124 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE reservation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE reservation (id INT NOT NULL, boat_id INT NOT NULL, consumer_id INT NOT NULL, slots_id INT NOT NULL, reservation_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_42C84955A1E84A29 ON reservation (boat_id)');
        $this->addSql('CREATE INDEX IDX_42C8495537FDBD6D ON reservation (consumer_id)');
        $this->addSql('CREATE INDEX IDX_42C849551E91875B ON reservation (slots_id)');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955A1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C8495537FDBD6D FOREIGN KEY (consumer_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C849551E91875B FOREIGN KEY (slots_id) REFERENCES slot (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE establishment ADD city VARCHAR(100) NOT NULL');
        $this->addSql('ALTER INDEX idx_bf5476ca9d86650f RENAME TO IDX_BF5476CAA76ED395');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT fk_ac0e20677f75e359');
        $this->addSql('DROP INDEX idx_ac0e20677f75e359');
        $this->addSql('ALTER TABLE slot ADD start_time TIME(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE slot ADD end_time TIME(0) WITHOUT TIME ZONE NOT NULL');
        $this->addSql('ALTER TABLE slot RENAME COLUMN id_boat_id TO boat_id');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E2067A1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_AC0E2067A1E84A29 ON slot (boat_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE reservation_id_seq CASCADE');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C84955A1E84A29');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C8495537FDBD6D');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C849551E91875B');
        $this->addSql('DROP TABLE reservation');
        $this->addSql('ALTER INDEX idx_bf5476caa76ed395 RENAME TO idx_bf5476ca9d86650f');
        $this->addSql('ALTER TABLE establishment DROP city');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E2067A1E84A29');
        $this->addSql('DROP INDEX IDX_AC0E2067A1E84A29');
        $this->addSql('ALTER TABLE slot DROP start_time');
        $this->addSql('ALTER TABLE slot DROP end_time');
        $this->addSql('ALTER TABLE slot RENAME COLUMN boat_id TO id_boat_id');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT fk_ac0e20677f75e359 FOREIGN KEY (id_boat_id) REFERENCES boat (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_ac0e20677f75e359 ON slot (id_boat_id)');
    }
}
