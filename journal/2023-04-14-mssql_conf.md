
item|meaning
-|-
control.alternatewritethrough|Enable optimized write through flush for O_DSYNC requests
control.hestacksize| Host extension stack size in KB
control.stoponguestprocessfault|Stops the process if any guest process reports unhandled exception
control.writethrough| Use O_DSYNC for file flag write through requests
coredump.captureminiandfull| Capture both mini and full core dumps
coredump.coredumptype| Core dump type to capture: mini, miniplus, filtered, full
distributedtransaction.allowonlysecurerpccalls| Configure secure only rpc calls for distributed transactions
distributedtransaction.fallbacktounsecurerpcifnecessary| Configure security only rpc calls for distributed transactions
distributedtransaction.maxlogsize|DTC log file size in MB. Default is 64MB
distributedtransaction.memorybuffersize|Circular buffer size in which traces are stored. This size is in MB and default is 10MB
distributedtransaction.servertcpport|MSDTC rpc server port
distributedtransaction.trace_cm|Traces in the connection manager
distributedtransaction.trace_contact|Traces the contact pool and contacts
distributedtransaction.trace_gateway|Traces Gateway source
distributedtransaction.trace_log| Log tracing
distributedtransaction.trace_misc|Traces that cannot be categorized into the other categories
distributedtransaction.trace_proxy| Traces that are generated in the MSDTC proxy
distributedtransaction.trace_svc| Traces service and .exe file startup
distributedtransaction.trace_trace| The trace infrastructure itself
distributedtransaction.trace_util|Traces utility routines that are called from multiple locations
distributedtransaction.trace_xa|XA Transaction Manager (XATM) tracing source
distributedtransaction.tracefilepath|Folder in which trace files should be stored
distributedtransaction.turnoffrpcsecurity| Enable or disable RPC security for distributed transactions
errorlog.numerrorlogs| Number of error log maintained before cycling the log.
extensibility.datadirectories|Colon separated directory paths available to sp_execute_external_script
extensibility.outboundnetworkaccess| Enable outbound network access for sp_execute_external_script
filelocation.defaultbackupdir|Default directory for backup files
filelocation.defaultdatadir| Default directory for data files
filelocation.defaultdumpdir| Default directory for crash dump files
filelocation.defaultlogdir| Default directory for log files
filelocation.errorlogfile| Error log file location
filelocation.machinekeyfile| Location of machine key file
filelocation.masterdatafile| Master database data file location
filelocation.masterlogfile| Master database log file location
hadr.hadrenabled| Allow SQL Server to use availability groups for high availability and disaster recovery
language.lcid| Locale identifier for SQL Server to use (e.g. 1033 for US - English)
memory.disablememorypressure| SQL Server disable memory pressure
memory.enablecontainersharedmemory| Enable or disable use of shared memory when SQL runs inside a container
memory.memory_optimized| Enable or disable SQL Server memory optimized features - persistent memory file enlightenment, memory protection
memory.memorylimitmb| SQL Server memory limit (megabytes)
network.disablesssd| Disable querying *SSSD*[^3] for AD account information and default to *LDAP*[^4] calls
network.enablekdcfromkrb5conf|Enable looking up KDC information from krb5.conf
network.forceencryption| Force encryption of incoming client connections
network.forcesecureldap| Force using LDAPS to contact domain controller
network.ipaddress| IP address for incoming connections
network.kerberoscredupdatefrequency| Time in seconds between checks for kerberos credentials that need to be updated
network.kerberoskeytabfile| Kerberos keytab file location
network.ldaphostcanon| Canonicalize hostnames with LDAP
network.privilegedadaccount| Privileged AD user to use for AD authentication
network.rpcport| TCP port for Rpc endpoint mapper
network.tcpport| TCP port for incoming connections
network.tlscert| Path to certificate file for encrypting incoming client connections
network.tlsciphers| TLS ciphers allowed for encrypted incoming client connections
network.tlskey| Path to private key file for encrypting incoming client connections
network.tlsprotocols| TLS protocol versions allowed for encrypted incoming client connections
network.trustedexternaldomains| Trusted domains outside the AD forest SQL is joined to
sqlagent.databasemailprofile| *SQL Agent*[^2] Database Mail profile name
sqlagent.enabled| Enable or disable SQLAgent
sqlagent.errorlogfile| SQL Agent log file path
sqlagent.errorlogginglevel| SQL Agent logging level bitmask - 1=Errors, 2=Warnings, 4=Info
sqlagent.jobhistorymaxrows| Maximum job history log size (in rows)
sqlagent.jobhistorymaxrowsperjob| Maximum job history rows per job
sqlagent.startupwaitforalldb| Set to 1 (default) if SqlAgent should wait for all databases on startup; set to 0 to wait for MSDB only
telemetry.customerfeedback| Telemetry status
telemetry.userrequestedlocalauditdirectory| Directory for telemetry local audit cache
uncmapping.| Maps UNC path to a local path. (e.g. ./mssql-conf set uncmapping //servername/sharename /tmp/folder)
wmi.enabled| Enable or disable *Wmi*[^1] services
wmi.recheck| Recheck Wmi settings periodically

[^1]: Windows Management Instrumentation，WMI 會在本機 系統 帳戶下的系統啟動時自動執行。 如果 WMI 未執行，當第一個管理應用程式或腳本要求與 WMI 命名空間的連線時，它會自動啟動。其他數個服務相依于 WMI 服務，取決於系統正在執行的作業系統版本。 [啟動和停止 WMI 服務](https://learn.microsoft.com/zh-tw/windows/win32/wmisdk/starting-and-stopping-the-wmi-service)
[^2]: SQLAgent：身為DBA每天可能都有很多routine的工作要作，如果樣樣都手動那可能每天上班時間24小時也會作不完，這時候我們就要來學習一下如何讓SQL Server自動化管理工作，在這篇文章將會幫大家介紹SQL Server Agent，並跟大家說明如何定義作業，讓SQL Server自動化管理工作。SQL Server的自動化管理工作是借由SQL Server Agent來完成，SQL Server Agent 是一個 Microsoft Windows 服務，如下圖您可以在服務的管理視窗中查詢管理SQL Server Agent的狀態。PS:SQL Server 2008安裝時，預設會將SQL Server Agent 服務停用，如果您有需要用到SQL Server建議您可以將該服務設定為自動，並啟動該服務。([SQL Server 無敵手冊第十二篇-設定SQL Server的自動化管理工作 (SQL Server Agent)](https://ithelp.ithome.com.tw/articles/10029139))
[^3]: System Security Services Daemon (SSSD) 守護程序是最初為Linux操作系統開發的軟件，它提供了一組守護程序來管理對遠程目錄服務和身份驗證機制的訪問。SSSD的開端在於開源軟件項目FreeIPA。SSSD的目的是簡化涉及多個不同主機的已認證和授權用戶訪問的系統管理。 [维基百科(英文)](https://en.wikipedia.org/wiki/System_Security_Services_Daemon)
[^4]: 輕型目錄存取協定, Lightweight Directory Access Protocol, LDAP, 是一個開放的，中立的，工業標準的應用協定，通過IP協定提供存取控制和維護分散式資訊的目錄資訊。 目錄服務在開發內部網路和與網際網路程式共享使用者、系統、網路、服務和應用的過程中占據了重要地位。例如，目錄服務可能提供了組織有序的記錄集合，通常有層級結構，例如公司電子郵件目錄。[維基百科](https://zh.wikipedia.org/zh-tw/轻型目录访问协议)