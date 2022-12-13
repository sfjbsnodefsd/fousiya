# provider "aws"{
#     region = "us-east-1"
#     access_key = "dummy-acces key"
#     secret_key = "dummy secret key"

# }
# resource "aws_instance" "web-instance-ubuntu" {
#     ami = "ami-0a6b2839d44d781b2"
#     instance_type = "t2.micro"
  
# }
output "helloworld" {
  value = "hello world this is coming from a terraform file"
}