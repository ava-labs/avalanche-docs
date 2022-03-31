# ------------------------------------------------------------------------------
# CONFIGURE OUR GCP CONNECTION
# ------------------------------------------------------------------------------

provider "google" {
  region  = "${var.region}"
  zone    = "${var.zone}"
  project = "${var.project}"
}

# ------------------------------------------------------------------------------
# ENABLE IAP SERVICES
# ------------------------------------------------------------------------------

resource "google_project_service" "project_service" {
  project      = "${var.project}"
  service      = "iap.googleapis.com"
}

# ------------------------------------------------------------------------------
# CONFIGURE OUR VPC AND SUBNETS
# ------------------------------------------------------------------------------

resource "google_compute_network" "vpc_network" {
  name                    = "${var.project}"
  project                 = "${var.project}"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "node_subnet_east1" {
  name          = "${var.node_subnet_name}"
  region        = "us-east1"
  project       = "${var.project}"
  ip_cidr_range = "10.142.0.0/24"
  network       = google_compute_network.vpc_network.id
}