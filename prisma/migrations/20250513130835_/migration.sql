/*
  Warnings:

  - You are about to alter the column `tanggal_lahir` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal_post` on the `diskusi` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal_lahir` on the `guru` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `waktu` on the `log_aktivitas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `id_users` on the `mata_pelajaran` table. All the data in the column will be lost.
  - You are about to alter the column `tanggal_upload` on the `materi_pelajaran` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `waktu` on the `notifikasi` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal_kumpul` on the `pengumpulan_tugas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal_lahir` on the `siswa` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deadline` on the `tugas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `mata_pelajaran` DROP FOREIGN KEY `mata_pelajaran_id_users_fkey`;

-- DropIndex
DROP INDEX `mata_pelajaran_id_users_fkey` ON `mata_pelajaran`;

-- AlterTable
ALTER TABLE `admin` MODIFY `tanggal_lahir` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `diskusi` MODIFY `tanggal_post` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `guru` MODIFY `tanggal_lahir` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `log_aktivitas` MODIFY `waktu` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `mata_pelajaran` DROP COLUMN `id_users`;

-- AlterTable
ALTER TABLE `materi_pelajaran` MODIFY `tanggal_upload` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `notifikasi` MODIFY `waktu` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `pengumpulan_tugas` MODIFY `tanggal_kumpul` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `siswa` MODIFY `tanggal_lahir` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tugas` MODIFY `deadline` DATETIME NOT NULL;
