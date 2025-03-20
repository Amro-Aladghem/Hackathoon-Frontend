using Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Azure.Storage.Blobs;


namespace Services
{
    public class SharedServices
    {
        private readonly AppDbContext _context;
        private readonly Cloudinary _cloudinary;

        public SharedServices(AppDbContext context,Cloudinary cloudinary)
        {
            _context = context;
            _cloudinary = cloudinary;
        }
        public int AddNewSession(int ? UserId)
        {
            var NewSession = new Session()
            {
                UserId = UserId,
                Name = null,
            };

            _context.Sessions.Add(NewSession);

            if(_context.SaveChanges()<=0)
            {
                new Exception("Failed to add new session!");
            }

            return NewSession.SessionId;
        }

        public async Task<string> UploadImageAsync(Stream fileStream, string fileName)
        {
            const long ImageMaxSize = 3 * 1024 * 1024;
            var allowedextention = new[] { ".jpg", ".jpeg", ".png" };

            string ex = Path.GetExtension(fileName).ToLower();

            if (fileStream.Length > ImageMaxSize)
            {
                throw new Exception("The Picture you has been sent is over 3mb sizing");
            }

            if (!allowedextention.Contains(ex))
            {
                throw new Exception("The file is not supported , only .png , .jpg");
            }

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(fileName, fileStream)
            };


            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return uploadResult.SecureUrl.ToString();
            }

            throw new Exception("Error uploading image to Server.");
        }

        public async Task<string> UploadFilesAsync(Stream fileStream,string fileName)
        {
            string connectionString = "";

            string containerName = "hack-pdf";

            BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);

            BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);

            BlobClient blobClient = containerClient.GetBlobClient(fileName);

            await blobClient.UploadAsync(fileStream, overwrite: true);

            return blobClient.Uri.ToString();
        }
    }

    
}
