variable "region" {
  description = "The GCP region"
  type        = string
}

variable "zone" {
  description = "The GCP zone"
  type        = string
}

variable "project" {
  description = "The project name"
  type        = string
}

variable "network" {
  description = "The network name"
  type        = string
}

variable "node_subnet_name" {
  description = "The node subnet name"
  type        = string
}

variable "node_name_prefix" {
  description = "The node name prefix"
  type        = string
}

variable "machine_type" {
  description = "The machine type to provision"
  type        = string
}

variable "p2p_port" {
  description = "The peer to peer port"
  type        = string
}

variable "base_os_image" {
  description = "The subnet ip range to setup"
  type        = string
}

variable "bucket_name" {
  description = "The gcs bucket name"
  type        = string
}