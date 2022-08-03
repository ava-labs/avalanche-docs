terraform {
  backend "gcs" {
    bucket = "my-avax-project"
    prefix  = "state"
  }
}
