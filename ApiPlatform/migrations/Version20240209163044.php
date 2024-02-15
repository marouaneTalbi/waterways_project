<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240209163044 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE comment_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE note_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE comment (id INT NOT NULL, createdby_id INT NOT NULL, boat_id INT NOT NULL, comment TEXT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9474526CF0B5AF0B ON comment (createdby_id)');
        $this->addSql('CREATE INDEX IDX_9474526CA1E84A29 ON comment (boat_id)');
        $this->addSql('COMMENT ON COLUMN comment.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE note (id INT NOT NULL, boat_id INT NOT NULL, createdby_id INT NOT NULL, proprete INT NOT NULL, confort INT NOT NULL, performance INT NOT NULL, equipement INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_CFBDFA14A1E84A29 ON note (boat_id)');
        $this->addSql('CREATE INDEX IDX_CFBDFA14F0B5AF0B ON note (createdby_id)');
        $this->addSql('CREATE TABLE user_boat (user_id INT NOT NULL, boat_id INT NOT NULL, PRIMARY KEY(user_id, boat_id))');
        $this->addSql('CREATE INDEX IDX_A2EFCF83A76ED395 ON user_boat (user_id)');
        $this->addSql('CREATE INDEX IDX_A2EFCF83A1E84A29 ON user_boat (boat_id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CF0B5AF0B FOREIGN KEY (createdby_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CA1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE note ADD CONSTRAINT FK_CFBDFA14A1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE note ADD CONSTRAINT FK_CFBDFA14F0B5AF0B FOREIGN KEY (createdby_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_boat ADD CONSTRAINT FK_A2EFCF83A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_boat ADD CONSTRAINT FK_A2EFCF83A1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE comment_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE note_id_seq CASCADE');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526CF0B5AF0B');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526CA1E84A29');
        $this->addSql('ALTER TABLE note DROP CONSTRAINT FK_CFBDFA14A1E84A29');
        $this->addSql('ALTER TABLE note DROP CONSTRAINT FK_CFBDFA14F0B5AF0B');
        $this->addSql('ALTER TABLE user_boat DROP CONSTRAINT FK_A2EFCF83A76ED395');
        $this->addSql('ALTER TABLE user_boat DROP CONSTRAINT FK_A2EFCF83A1E84A29');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE note');
        $this->addSql('DROP TABLE user_boat');
    }
}
