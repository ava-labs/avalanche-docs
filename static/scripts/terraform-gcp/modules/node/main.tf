# ------------------------------------------------------------------------------
# CONFIGURE OUR GCP CONNECTION
# ------------------------------------------------------------------------------

provider "google" {
  region  = "${var.region}"
  zone    = "${var.zone}"
  project = "${var.project}"
}

# ------------------------------------------------------------------------------
# CREATE OUR PUBLIC IP
# ------------------------------------------------------------------------------

resource "google_compute_address" "static" {
  project = "${var.project}"
  region  = "${var.region}"
  name = "static-ip-${count.index}"
  address_type = "EXTERNAL"
  count = "${var.total_instances}"
}

# ------------------------------------------------------------------------------
# CREATE OUR DISK
# ------------------------------------------------------------------------------
resource "google_compute_disk" "node_disk" {
    name  = "disk-${count.index}"
    type  = "pd-ssd"
    zone    = "${var.zone}"
    #snapshot = "https://www.googleapis.com/compute/v1/projects/my-avax-project/global/snapshots/my-avax-snapshot" - if you have a snapshot you can leverage it here
    size = 400
    count = "${var.total_instances}"
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE OUR NODE
# ---------------------------------------------------------------------------------------------------------------------
resource "google_compute_instance" "node" {
  project      = "${var.project}"
  name         = "${var.node_name_prefix}-${count.index}"
  machine_type = "${var.machine_type}"
  zone         = "${var.zone}"

  # We're tagging the instance with it's unique name within the project to set FW rules
  tags = ["${var.node_name_prefix}-${count.index}"]

  labels = {
    project = "${var.project}"
    network = "${var.network}"
  }

  boot_disk {        
    source      = google_compute_disk.node_disk[count.index].self_link
    device_name = google_compute_disk.node_disk[count.index].name
    auto_delete = false
  }

  # we need this scope to enable ops monitoring
  service_account {
    scopes = ["monitoring", "storage-rw", "logging-write"]
  }

  deletion_protection = true
  allow_stopping_for_update = true

  network_interface {
    network = "${var.project}"
    subnetwork = "${var.node_subnet_name}"
    subnetwork_project = "${var.project}"

    access_config {
      nat_ip = "${google_compute_address.static[count.index].address}"
    }
  }

  metadata = {
    startup-script = <<SCRIPT
#!/bin/bash
# add anything here that you want to execute when the machine starts... such as the avax installer shell script.
SCRIPT
  }

  count = "${var.total_instances}"
}

# ---------------------------------------------------------------------------------------------------------------------
# ALLOW SSH VIA IAP
# ---------------------------------------------------------------------------------------------------------------------

resource "google_compute_firewall" "iap_ingress" {
  name    = "iap-ingress-${count.index}"
  project = "${var.project}"
  network = "${var.project}"

  direction = "INGRESS"

  source_ranges = ["35.235.240.0/20"] # this is googles IAP range

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  target_tags = ["${var.node_name_prefix}-${count.index}"]

  count = "${var.total_instances}"
}

# ---------------------------------------------------------------------------------------------------------------------
# ALLOW P2P PORT INGRESS
# ---------------------------------------------------------------------------------------------------------------------

resource "google_compute_firewall" "p2p_ingress" {
  name    = "p2p-ingress-${count.index}"
  project = "${var.project}"
  network = "${var.project}"

  direction = "INGRESS"

  source_ranges = ["0.0.0.0/0"] # we need to allow any peer inbound

  allow {
    protocol = "tcp"
    ports    = ["${var.p2pport}"]
  }

  target_tags = ["${var.node_name_prefix}-${count.index}"]

  count = "${var.total_instances}"
}