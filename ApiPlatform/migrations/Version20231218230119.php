<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231218230119 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE kabis_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE kbis_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE notification_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE slot_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE kbis (id INT NOT NULL, createdby_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, name VARCHAR(255) NOT NULL, status INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FB034038F0B5AF0B ON kbis (createdby_id)');
        $this->addSql('COMMENT ON COLUMN kbis.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN kbis.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE notification (id INT NOT NULL, user_id INT NOT NULL, title VARCHAR(255) NOT NULL, message TEXT NOT NULL, status VARCHAR(50) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_BF5476CAA76ED395 ON notification (user_id)');
        $this->addSql('COMMENT ON COLUMN notification.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE slot (id INT NOT NULL, id_boat_id INT NOT NULL, start_booking_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, end_booking_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_AC0E20677F75E359 ON slot (id_boat_id)');
        $this->addSql('ALTER TABLE kbis ADD CONSTRAINT FK_FB034038F0B5AF0B FOREIGN KEY (createdby_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CAA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E20677F75E359 FOREIGN KEY (id_boat_id) REFERENCES boat (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE kabis');
        $this->addSql('ALTER TABLE boat ADD min_time INT NOT NULL');
        $this->addSql('ALTER TABLE establishment ALTER city SET NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE kbis_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE notification_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE slot_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE kabis_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE kabis (id INT NOT NULL, user_id INT NOT NULL, name VARCHAR(255) NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, status INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN kabis.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE kbis DROP CONSTRAINT FK_FB034038F0B5AF0B');
        $this->addSql('ALTER TABLE notification DROP CONSTRAINT FK_BF5476CAA76ED395');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E20677F75E359');
        $this->addSql('DROP TABLE kbis');
        $this->addSql('DROP TABLE notification');
        $this->addSql('DROP TABLE slot');
        $this->addSql('ALTER TABLE establishment ALTER city DROP NOT NULL');
        $this->addSql('ALTER TABLE boat DROP min_time');
    }
}
