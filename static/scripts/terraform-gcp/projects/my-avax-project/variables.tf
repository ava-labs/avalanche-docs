variable "network" {
  description = "The asset network"
  type        = string
}

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

variable "node_subnet_name" {
  description = "The node subnet name"
  type        = string
}

variable "ip_cidr_range" {
  description = "The subnet ip range to setup"
  type        = string
}

variable "bucket_name" {
  description = "Shared bucket name value"
  type        = string
}

variable "node_name_prefix" {
  description = "The node naming prefix"
  type        = string
}

variable "p2p_port" {
  description = "The peer to peer port"
  type        = string
}

variable "machine_type" {
  description = "The machine spec to provision"
  type        = string
}

variable "base_os_image" {
  description = "The base os image to use"
  type        = string
}

variable "total_instances" {
  description = "The number of instances to provision"
  type        = number
}