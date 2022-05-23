#!/bin/bash
# Does a multi-step installation of Prometheus, Grafana, node_exporter and Avalanche dashboards
# Intended for non-technical validators, assumes running on compatible Ubuntu.

#stop on errors
set -e

#running as root gives the wrong homedir, check and exit if run with sudo.
if ((EUID == 0)); then
    echo "The script is not designed to run as root user. Please run it without sudo prefix."
    exit
fi

#helper function that prints usage
usage () {
  echo "Usage: $0 [--1|--2|--3|--4|--5|--help]"
  echo ""
  echo "Options:"
  echo "   --help   Shows this message"
  echo "   --1      Step 1: Installs Prometheus"
  echo "   --2      Step 2: Installs Grafana"
  echo "   --3      Step 3: Installs node_exporter"
  echo "   --4      Step 4: Installs AvalancheGo Grafana dashboards"
  echo "   --5      Step 5: (Optional) Installs additional dashboards"
  echo ""
  echo "Run without any options, script will download and install latest version of AvalancheGo dashboards."
}

#helper function to check for presence of required commands, and install if missing
check_reqs () {
  if ! command -v curl &> /dev/null
  then
      echo "curl could not be found, will install..."
      sudo apt-get install curl -y
  fi
  if ! command -v wget &> /dev/null
  then
      echo "wget could not be found, will install..."
      sudo apt-get install wget -y
  fi
}

#helper function to check for supported environment
get_environment() {
  echo "Checking environment..."
  check_reqs
  foundArch="$(uname -m)"                         #get system architecture
  foundOS="$(uname)"                              #get OS
  if [ "$foundOS" != "Linux" ]; then
    #sorry, don't know you.
    echo "Unsupported operating system: $foundOS!"
    echo "Exiting."
    exit
  fi
  if [ "$foundArch" = "aarch64" ]; then
    getArch="arm64"                               #we're running on arm arch (probably RasPi)
    echo "Found arm64 architecture..."
  elif [ "$foundArch" = "x86_64" ]; then
    getArch="amd64"                               #we're running on intel/amd
    echo "Found amd64 architecture..."
  else
    #sorry, don't know you.
    echo "Unsupported architecture: $foundArch!"
    echo "Exiting."
    exit
  fi
}

install_prometheus() {
  echo "AvalancheGo monitoring installer"
  echo "--------------------------------"
  echo "STEP 1: Installing Prometheus"
  echo
  get_environment
  check_reqs
  mkdir -p /tmp/avalanche-monitoring-installer/prometheus
  cd /tmp/avalanche-monitoring-installer/prometheus

  promFileName="$(curl -s https://api.github.com/repos/prometheus/prometheus/releases/latest | grep -o "http.*linux-$getArch\.tar\.gz")"
  if [[ $(wget -S --spider "$promFileName"  2>&1 | grep 'HTTP/1.1 200 OK') ]]; then
    echo "Prometheus install archive found: $promFileName"
  else
    echo "Unable to find Prometheus install archive. Exiting."
    exit
  fi
  echo "Attempting to download: $promFileName"
  wget -nv --show-progress -O prometheus.tar.gz "$promFileName"
  mkdir prometheus
  tar xvf prometheus.tar.gz -C prometheus --strip-components=1
  echo "Installing..."
  sudo useradd -M -r -s /bin/false prometheus
  sudo mkdir /etc/prometheus /var/lib/prometheus
  sudo apt-get install -y apt-transport-https
  cd prometheus
  sudo cp {prometheus,promtool} /usr/local/bin/
  sudo chown prometheus:prometheus /usr/local/bin/{prometheus,promtool}
  sudo chown -R prometheus:prometheus /etc/prometheus
  sudo chown prometheus:prometheus /var/lib/prometheus
  sudo cp -r {consoles,console_libraries} /etc/prometheus/
  sudo cp prometheus.yml /etc/prometheus/

  #creating the service file
  {
    echo "[Unit]"
    echo "Description=Prometheus"
    echo "Documentation=https://prometheus.io/docs/introduction/overview/"
    echo "Wants=network-online.target"
    echo "After=network-online.target"
    echo ""
    echo "[Service]"
    echo "Type=simple"
    echo "User=prometheus"
    echo "Group=prometheus"
    echo "ExecReload=/bin/kill -HUP \$MAINPID"
    echo "ExecStart=/usr/local/bin/prometheus   --config.file=/etc/prometheus/prometheus.yml   --storage.tsdb.path=/var/lib/prometheus   --web.console.templates=/etc/prometheus/consoles   --web.console.libraries=/etc/prometheus/console_libraries   --web.listen-address=0.0.0.0:9090   --web.external-url="
    echo ""
    echo "SyslogIdentifier=prometheus"
    echo "Restart=always"
    echo ""
    echo "[Install]"
    echo "WantedBy=multi-user.target"
  }>>prometheus.service
  sudo cp prometheus.service /etc/systemd/system/prometheus.service

  echo "Creating Prometheus service..."
  sudo systemctl daemon-reload
  sudo systemctl start prometheus
  sudo systemctl enable prometheus

  echo
  echo "Done!"
  echo
  echo "Prometheus service should be up and running now."
  echo "To check that the service is running use the following command (q to exit):"
  echo "sudo systemctl status prometheus"
  echo
  echo "You can also check Prometheus web interface, available on http://your-node-host-ip:9090/"
  echo
  echo "If everything looks ok you can now continue with installing Grafana. Refer to the tutorial:"
  echo "https://docs.avax.network/nodes/maintain/setting-up-node-monitoring#grafana"
  echo
  echo "Reach out to us on https://chat.avax.network if you're having problems."

  exit 0
}

install_grafana() {
  echo "AvalancheGo monitoring installer"
  echo "--------------------------------"
  echo "STEP 2: Installing Grafana"
  echo
  wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
  echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
  sudo apt-get update -y
  sudo apt-get install grafana -y

  echo "Starting Grafana service..."
  sudo systemctl daemon-reload
  sudo systemctl start grafana-server
  sudo systemctl enable grafana-server.service

  echo
  echo "Done!"
  echo
  echo "Grafana service should be up and running now."
  echo "To check that the service is running use the following command (q to exit):"
  echo "sudo systemctl status grafana-server"
  echo
  echo "You can also check Grafana web interface, available on http://your-node-host-ip:3000/"
  echo
  echo "Now you need to set up Prometheus as a data source for Grafana. Refer to the tutorial:"
  echo "https://docs.avax.network/nodes/maintain/setting-up-node-monitoring#exporter"
  echo
  echo "Reach out to us on https://chat.avax.network if you're having problems."

  exit 0
}

install_exporter() {
  echo "AvalancheGo monitoring installer"
  echo "--------------------------------"
  echo "STEP 3: Installing node_exporter"
  echo
  get_environment
  mkdir -p /tmp/avalanche-monitoring-installer/exporter_archive
  cd /tmp/avalanche-monitoring-installer/exporter_archive
  echo "Dowloading archive..."
  nodeFileName="$(curl -s https://api.github.com/repos/prometheus/node_exporter/releases/latest | grep -o "http.*linux-$getArch\.tar\.gz")"
  echo $nodeFileName
  wget -nv --show-progress -O node_exporter.tar.gz "$nodeFileName"
  tar xvf node_exporter.tar.gz -C /tmp/avalanche-monitoring-installer/exporter_archive --strip-components=1
  sudo mv /tmp/avalanche-monitoring-installer/exporter_archive/node_exporter /usr/local/bin
  echo "Installed, version:"
  node_exporter --version
  echo
  echo "Creating service..."

  {
    echo "[Unit]"
    echo "Description=Node exporter"
    echo "Documentation=https://github.com/prometheus/node_exporter"
    echo "Wants=network-online.target"
    echo "After=network-online.target"
    echo ""
    echo "[Service]"
    echo "Type=simple"
    echo "User=prometheus"
    echo "Group=prometheus"
    echo "ExecReload=/bin/kill -HUP \$MAINPID"
    echo "ExecStart=/usr/local/bin/node_exporter \\"
    echo "    --collector.cpu \\"
    echo "    --collector.diskstats \\"
    echo "    --collector.filesystem \\"
    echo "    --collector.loadavg \\"
    echo "    --collector.meminfo \\"
    echo "    --collector.filefd \\"
    echo "    --collector.netdev \\"
    echo "    --collector.stat \\"
    echo "    --collector.netstat \\"
    echo "    --collector.systemd \\"
    echo "    --collector.uname \\"
    echo "    --collector.vmstat \\"
    echo "    --collector.time \\"
    echo "    --collector.mdadm \\"
    echo "    --collector.zfs \\"
    echo "    --collector.tcpstat \\"
    echo "    --collector.bonding \\"
    echo "    --collector.hwmon \\"
    echo "    --collector.arp \\"
    echo "    --web.listen-address=:9100 \\"
    echo "    --web.telemetry-path=\"/metrics\""
    echo ""
    echo "[Install]"
    echo "WantedBy=multi-user.target"
  }>>node_exporter.service
  sudo cp node_exporter.service /etc/systemd/system/node_exporter.service

  sudo systemctl start node_exporter
  sudo systemctl enable node_exporter

  echo "Finishing configuration..."

  cp /etc/prometheus/prometheus.yml .
  {
    echo "  - job_name: 'avalanchego'"
    echo "    metrics_path: '/ext/metrics'"
    echo "    static_configs:"
    echo "      - targets: ['localhost:9650']"
    echo "  - job_name: 'avalanchego-machine'"
    echo "    static_configs:"
    echo "      - targets: ['localhost:9100']"
    echo "        labels:"
    echo "          alias: 'machine'"
  }>>prometheus.yml
  sudo cp prometheus.yml /etc/prometheus/
  sudo systemctl restart prometheus
  echo
  echo "Done!"
  echo
  echo "Node_exporter service should be up and running now."
  echo "To check that the service is running use the following command (q to exit):"
  echo "sudo systemctl status node_exporter"
  echo
  echo "Now you need to set up Grafana dashboards next. Refer to the tutorial:"
  echo "https://docs.avax.network/nodes/maintain/setting-up-node-monitoring#dashboards"
  echo
  echo "Reach out to us on https://chat.avax.network if you're having problems."
}

install_dashboards() {
  #check for installation
  if test -f "/etc/grafana/grafana.ini"; then
    echo "AvalancheGo monitoring installer"
    echo "--------------------------------"
  else
    echo "Node monitoring installation not found!"
    echo
    echo "Please refer to the tutorial:"
    echo "https://docs.avax.network/nodes/maintain/setting-up-node-monitoring"
    echo
    usage
    exit 0
  fi

  if test -f "/etc/grafana/provisioning/dashboards/avalanche.yaml"; then
    echo "STEP 4: Installing Grafana dashboards"
    provisioningDone=true
    echo
    echo "Dashboards already provisioned, switching to upgrade mode."
  else
    provisioningDone=false
  fi

  echo
  echo "Downloading..."
  mkdir -p /tmp/avalanche-monitoring-installer/dashboards-install
  cd /tmp/avalanche-monitoring-installer/dashboards-install

  wget -nd -m -nv https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/c_chain.json
  wget -nd -m -nv https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/database.json
  wget -nd -m -nv https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/machine.json
  wget -nd -m -nv https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/main.json
  wget -nd -m -nv https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/network.json
  wget -nd -m -nv https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/p_chain.json
  wget -nd -m -nv https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/x_chain.json
  if test -f "/etc/grafana/dashboards/subnets.json"; then
    wget -nd -m -nv https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/subnets.json
  fi

  sudo mkdir -p /etc/grafana/dashboards
  sudo cp *.json /etc/grafana/dashboards

  if [ "$provisioningDone" = "false" ]; then
    echo
    echo "Provisioning dashboards..."
    {
      echo "apiVersion: 1"
      echo ""
      echo "providers:"
      echo "  - name: 'Avalanche official'"
      echo "    orgId: 1"
      echo "    folder: ''"
      echo "    folderUid: ''"
      echo "    type: file"
      echo "    disableDeletion: false"
      echo "    updateIntervalSeconds: 30"
      echo "    allowUiUpdates: true"
      echo "    options:"
      echo "      path: /etc/grafana/dashboards"
      echo "      foldersFromFilesStructure: true"
    } >>avalanche.yaml
    sudo cp avalanche.yaml /etc/grafana/provisioning/dashboards/
    echo "Provisioning datasource..."
    {
      echo "apiVersion: 1"
      echo ""
      echo "datasources:"
      echo "  - name: Prometheus"
      echo "    type: prometheus"
      echo "    access: proxy"
      echo "    orgId: 1"
      echo "    url: http://localhost:9090"
      echo "    isDefault: true"
      echo "    version: 1"
      echo "    editable: false"
    } >>prom.yaml
    sudo cp prom.yaml /etc/grafana/provisioning/datasources/
    sudo systemctl restart grafana-server
  fi
  echo
  echo "Done!"
  echo
  echo "AvalancheGo Grafana dashboards have been installed and updated."
  echo "It might take up to 30s for new versions to show up in Grafana."
  echo
  echo "Reach out to us on https://chat.avax.network if you're having problems."
}

install_extras() {
  #check for installation
  if test -f "/etc/grafana/grafana.ini"; then
    echo "AvalancheGo monitoring installer"
    echo "--------------------------------"
  else
    echo "Node monitoring installation not found!"
    echo
    echo "Please refer to the tutorial:"
    echo "https://docs.avax.network/nodes/maintain/setting-up-node-monitoring"
    echo
    usage
    exit 0
  fi

  echo "STEP 5: Installing additional dashboards"
  echo
  echo "Downloading..."
  mkdir -p /tmp/avalanche-monitoring-installer/dashboards-install
  cd /tmp/avalanche-monitoring-installer/dashboards-install

  wget -nd -m -nv https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/subnets.json

  sudo mkdir -p /etc/grafana/dashboards
  sudo cp subnets.json /etc/grafana/dashboards

  echo
  echo "Done!"
  echo
  echo "Additional Grafana dashboards have been installed and updated."
  echo "It might take up to 30s for new versions to show up in Grafana."
}

if [ $# -ne 0 ] #arguments check
then
  case $1 in
    --1) #install prometheus
      install_prometheus
      exit 0
      ;;
    --2) #install grafana
      install_grafana
      exit 0
      ;;
    --3) #install node_exporter
      install_exporter
      exit 0
      ;;
    --4) #install AvalancheGo dashboards
      install_dashboards
      exit 0
      ;;
    --5) #install extra dashboards
      install_extras
      exit 0
      ;;
    --help)
      usage
      exit 0
      ;;
  esac
fi
install_dashboards

exit 0
