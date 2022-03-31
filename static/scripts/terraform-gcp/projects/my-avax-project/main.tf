# ------------------------------------------------------------------------------
# CONFIGURE OUR GCP CONNECTION
# ------------------------------------------------------------------------------

provider "google-beta" {
  region  = "${var.region}"
  zone    = "${var.zone}"
  project = "${var.project}"
}

# ------------------------------------------------------------------------------
# CREATE THE VPC AND SUBNET
# ------------------------------------------------------------------------------

module "vpc" {
  source           = "../../../modules/vpc"

  region           = "${var.region}"
  zone             = "${var.zone}"
  project          = "${var.project}"
  ip_cidr_range    = "${var.ip_cidr_range}"
  node_subnet_name = "${var.node_subnet_name}"
}

# ------------------------------------------------------------------------------
# BUILD THE NODES
# ------------------------------------------------------------------------------

module "node" {
  source              = "../../modules/node"

  region              = "${var.region}"
  zone                = "${var.zone}"
  project             = "${var.project}"
  network             = "${var.network}"
  node_subnet_name    = "${var.node_subnet_name}"
  node_name_prefix    = "${var.node_name_prefix}"
  machine_type        = "${var.machine_type}"
  p2p_port            = "${var.p2p_port}"
  base_os_image       = "${var.base_os_image}"
  bucket_name         = "${var.bucket_name}"
  total_instances     = "${var.total_instances}"  
}