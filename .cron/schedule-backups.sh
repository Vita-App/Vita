#!/bin/sh

# Command to backup db
mongodump --uri="MONGODB_URI"

# Name of the backup file
backup_folder=`date "+%d-%m-%Y_%T"`
base_path="/mnt/volume_blr1_01/Vita-Backup/${backup_folder}"
archive_path="${base_path}.tar.gz"

# Compress the backup folder, Compressed 220KB to 44KB 🚀
tar -czf $archive_path ./dump/Vita

# Remove the backup folder
rm -rf ./dump

# Remove backups older than 7 days
find /mnt/volume_blr1_01/Vita-Backup -type f -mtime +7 -exec rm {} \;

# Command to unarchive the backup
# tar -xzf $archive_path --force-local

echo "Backup Successfull!"
