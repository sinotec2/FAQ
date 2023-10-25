# ElasticView 

## 背景

### 使用

- [usage](http://www.elastic-view.cn/usage.html)

### instance

[node03:8090](http://200.200.31.47:8090/)

## cmd

### ElasticView/cmd/build/main.go

這段 GO 程式碼主要是用於編譯和打包一個名為 "ev" 的應用程式。以下是該程式碼的詳細說明：

1. **引入的套件**：程式碼引入了多個外部和內部套件，包括文件路徑操作、命令行參數解析、日誌記錄等。

2. **初始化**：在 `init` 函數中，程式碼初始化了一些命令行參數，例如程序的家目錄、二進制名稱和配置文件的路徑。

3. **主函數**：`main` 函數首先初始化配置，然後進行應用程式的編譯。如果編譯成功，它將輸出一條成功的日誌消息。

4. **編譯函數**：`BuildEvSvr` 函數負責編譯多個平台的二進制文件，例如 Linux、Darwin（macOS）和 Windows。編譯完成後，它會將這些二進制文件和配置文件打包成一個 ZIP 文件。

5. **輔助函數**：
   - `getExecutableName`：根據操作系統和架構返回可執行文件的名稱。
   - `buildBackend`：負責實際的編譯操作。
   - `newBuildConfig`：創建一個新的編譯配置。
   - `RunGoBuild`：運行 Go 編譯命令。

6. **Build 結構體**：這個結構體包含了多個方法，每個方法都是針對一個特定的平台和架構進行編譯。

7. **註釋掉的函數**：`BuildVue` 函數被註釋掉了，它可能是用於編譯 Vue.js 前端應用程式的。

### cmd/ev-cli/main.go

```GO
package main

func main(){

}
```

### cmd/ev/main.go

這段 GO 程式碼主要是用於初始化和運行一個名為 "ev" 的伺服器應用程式。以下是該程式碼的詳細說明：

1. **引入的套件**：程式碼引入了多個外部和內部套件，包括命令行參數解析、日誌記錄、操作系統信號處理等。

2. **初始化**：在 `init` 函數中，程式碼初始化了一些命令行參數，例如程序的家目錄、二進制名稱和配置文件的路徑。

3. **主函數**：
   - 使用 `server.Initialize` 函數初始化伺服器。
   - 使用 `svr.Init` 函數進行伺服器的進一步初始化。
   - 使用 `go listenToSystemSignals` 函數啟動一個協程來監聽系統信號，以便在接收到終止信號時優雅地關閉伺服器。
   - 使用 `svr.Run` 函數運行伺服器。

4. **系統信號監聽**：`listenToSystemSignals` 函數監聽系統信號，特別是中斷信號和終止信號。當接收到這些信號時，它會嘗試優雅地關閉伺服器，並在 30 秒的超時後強制關閉。

5. **錯誤處理**：如果在初始化或運行伺服器的過程中遇到任何錯誤，程式碼將輸出一條錯誤消息並終止執行。

## docs/docs.go

這段 GO 程式碼是由 `swaggo/swag` 工具自動生成的，用於支援 Swagger 文檔生成。Swagger 是一個 API 規範和框架，用於設計、構建、文檔和使用 RESTful Web 服務。以下是該程式碼的詳細說明：

1. **註釋**：開頭的註釋明確指出這段程式碼是由 `swaggo/swag` 工具生成的，並且不應該被手動編輯。

2. **docTemplate**：這是一個常量，定義了 Swagger 文檔的基本模板。它包含了一些基本的 Swagger 規範字段，如 `schemes`、`swagger`、`info`、`host`、`basePath` 和 `paths`。這些字段的值將在運行時被填充。

3. **SwaggerInfo**：這是一個全局變量，它是 `swag.Spec` 的實例。它包含了 Swagger 文檔的一些基本信息，如版本、主機、基本路徑、方案、標題和描述。這些值可以在其他地方被修改，以定制 Swagger 文檔的內容。

4. **init 函數**：這是一個特殊的函數，它在包被導入時自動執行。在這個函數中，`SwaggerInfo` 被註冊到 `swag`，這樣當 `swag` 生成 Swagger 文檔時，它就可以使用這些信息。

總之，這段程式碼的主要目的是提供 Swagger 文檔的基本模板和信息，以便 `swaggo/swag` 工具可以使用它來生成完整的 Swagger 文檔。

## api

### pkg/api/base_controller.go

這段 GO [程式碼](https://github.com/1340691923/ElasticView/blob/main/pkg/api/base_controller.go)定義了一個名為 `BaseController` 的 API 控制器，它提供了一些基本的功能，特別是與 HTTP 請求和響應相關的功能。以下是該程式碼的詳細說明：

1. **引入的套件**：程式碼引入了多個外部和內部套件，包括 HTTP 請求處理、HTTP 響應處理、Gin Web 框架等。

2. **BaseController 結構體**：
   - `BaseController` 是一個控制器結構體，它包含了兩個指針字段：`Request` 和 `Response`。這兩個字段分別來自 `request` 和 `response` 套件，用於處理 HTTP 請求和響應。
   - `NewBaseController` 函數是 `BaseController` 的構造函數，它接受一個請求和一個響應對象，並返回一個新的 `BaseController` 實例。
   - `getPostBody` 方法用於從 Gin 的上下文中獲取 HTTP POST 請求的主體。它首先使用 `ctx.GetRawData` 方法獲取原始的請求主體，然後將其設置回上下文的請求主體，以便後續的處理器可以再次讀取它。

總之，這段程式碼定義了一個基本的 API 控制器，它提供了一些與 HTTP 請求和響應相關的基本功能。

### pkg/api/dsl_history_controller.go

這段 GO [程式碼](https://github.com/1340691923/ElasticView/blob/main/pkg/api/dsl_history_controller.go)定義了一個名為 `DslHistoryController` 的 API 控制器，它提供了與 [DSL 語法][dsl]查詢歷史記錄相關的功能。以下是該程式碼的詳細說明：

1. **引入的套件**：程式碼引入了多個外部和內部套件，包括日誌記錄、SQL 存儲、JWT 處理、模型定義、HTTP 響應處理、工具函數和 [Gin Web][] 框架。

2. **DslHistoryController 結構體**：
   - `DslHistoryController` 是一個控制器結構體，它包含了 JWT 處理、SQL 存儲、日誌和基本控制器的指針字段。
   - `NewDslHistoryController` 函數是 `DslHistoryController` 的構造函數，它接受 JWT 處理、SQL 存儲、日誌和基本控制器作為參數，並返回一個新的 `DslHistoryController` 實例。

3. **ListAction 方法**：
   - 這個方法用於查詢 DSL 歷史記錄列表。
   - 首先，它解析 JWT 令牌以獲取用戶 ID。
   - 然後，它綁定請求參數到 `GmDslHistoryModel` 模型。
   - 使用模型的 `List` 和 `Count` 方法來獲取歷史記錄的列表和總數。
   - 最後，它返回查詢結果。

4. **CleanAction 方法**：
   - 這個方法用於清空 DSL 查詢記錄。
   - 首先，它解析 JWT 令牌以獲取用戶 ID。
   - 然後，它使用 `GmDslHistoryModel` 模型的 `Clean` 方法來清空用戶的 DSL 查詢記錄。
   - 最後，它返回操作成功的響應。

總之，這段程式碼定義了一個 API 控制器，它提供了查詢和清空 DSL 語法查詢歷史記錄的功能。如果您有其他問題或需要進一步的資訊，請告訴我。

### pkg/api/es_backup_controller.go

這段 GO [程式碼](https://github.com/1340691923/ElasticView/blob/main/pkg/api/es_backup_controller.go)定義了一個名為 `EsBackUpController` 的 API 控制器，該控制器提供了與 Elasticsearch 快照和備份相關的功能。以下是該程式碼的詳細說明：

1. **引入的套件**：程式碼引入了多個外部和內部套件，包括 DTO（Data Transfer Object）定義、Elasticsearch SDK 工廠、日誌記錄、HTTP 響應處理、工具函數和 Gin Web 框架。

2. **EsBackUpController 結構體**：
   - `EsBackUpController` 是一個控制器結構體，它包含了基本控制器、日誌、Elasticsearch 客戶端服務和 Elasticsearch 備份服務的指針字段。
   - `NewEsBackUpController` 函數是 `EsBackUpController` 的構造函數，它接受基本控制器、日誌、Elasticsearch 客戶端服務和 Elasticsearch 備份服務作為參數，並返回一個新的 `EsBackUpController` 實例。

3. **API 方法**：
   - **SnapshotRepositoryListAction**：查詢 Elasticsearch 快照仓库列表。
   - **SnapshotCreateRepositoryAction**：新建 Elasticsearch 快照仓库。
   - **CleanupeRepositoryAction**：清理 Elasticsearch 快照仓库。
   - **SnapshotDeleteRepositoryAction**：刪除 Elasticsearch 快照仓库。
   - **CreateSnapshotAction**：創建 Elasticsearch 快照。
   - **SnapshotListAction**：查詢 Elasticsearch 快照列表。
   - **SnapshotDeleteAction**：刪除 Elasticsearch 快照。
   - **SnapshotDetailAction**：查詢 Elasticsearch 快照詳情。
   - **SnapshotRestoreAction**：將 Elasticsearch 索引恢复至快照時的狀態。
   - **SnapshotStatusAction**：獲取 Elasticsearch 快照的狀態。

每個 API 方法都首先解析和驗證請求數據，然後使用相應的服務進行操作，最後返回操作結果。

總之，這段程式碼定義了一個 API 控制器，它提供了與 Elasticsearch 快照和備份相關的功能。

### pkg/api/es_controller.go

這是一段 Go 語言的[程式碼](https://github.com/1340691923/ElasticView/blob/main/pkg/api/es_controller.go)，主要與 Elasticsearch 有關。以下是該程式碼的中文說明：

1. **導入的套件**：
   - 引入了多個內部和外部的套件，包括 `bytes`, `errors`, `fmt`, `github.com/gin-gonic/gin` 等。

2. **EsController 結構**：
   - 定義了一個名為 `EsController` 的結構，該結構包含了多個屬性，如日誌、Elasticsearch 客戶端服務、JWT 服務等。

3. **NewEsController 函數**：
   - 這是一個建構函數，用於創建 `EsController` 的新實例。

4. **PingAction 函數**：
   - 用於檢查 Elasticsearch 的連接是否正常。如果密碼不為空，它會進行解密。然後，它會嘗試 ping Elasticsearch 並返回結果。

5. **CatAction 函數**：
   - 這是 Elasticsearch 的 CAT API 的實現。它可以執行多種 CAT 操作，如查看集群健康狀態、查看分片、查看索引等。

6. **RunDslAction 函數**：
   - 允許用戶運行 Elasticsearch 的 DSL 查詢。它還處理 GET 請求的特殊情況，並將 DSL 查詢的結果返回給用戶。

7. **SqlToDslAction 函數**：
   - 將 SQL 查詢轉換為 Elasticsearch 的 DSL 查詢。它使用 `elasticsql` 套件進行轉換。

8. **OptimizeAction 函數**：
   - 對 Elasticsearch 的索引進行多種操作，如刷新、清除緩存、合併等。

9. **RecoverCanWrite 函數**：
   - 如果 Elasticsearch 的索引因某種原因被設置為只讀，此函數將其恢復為可寫狀態。

整體來說，這段程式碼提供了一個 API 控制器，該控制器允許用戶執行多種與 Elasticsearch 相關的操作，如檢查連接、運行查詢、優化索引等。

### pkg/api/es_crud_controller.go

這是一段 Go 語言的[程式碼](https://github.com/1340691923/ElasticView/blob/main/pkg/api/es_crud_controller.go)，主要與 Elasticsearch 的 [CRUD](#crud) 操作有關。以下是該程式碼的中文說明：

1. **導入的套件**：
   - 引入了多個內部和外部的套件，包括 `github.com/gin-gonic/gin`、`github.com/1340691923/ElasticView/pkg/dto` 等。

2. **EsCrudController 結構**：
   - 定義了一個名為 `EsCrudController` 的結構，該結構包含了多個屬性，如 Elasticsearch 客戶端服務、日誌和 [Navicat](#Navicat) 服務。

3. **NewEsCrudController 函數**：
   - 這是一個建構函數，用於創建 `EsCrudController` 的新實例。

4. **GetList 函數**：
   - 這是一個可視化篩選獲取數據的函數。它首先綁定請求到 `crudFilter`，然後使用 Navicat 服務從 Elasticsearch 中獲取數據列表和數據計數。

5. **GetDSL 函數**：
   - 這是一個可視化獲取 DSL 查詢的函數。它首先綁定請求到 `crudFilter`，然後使用 Navicat 服務從 Elasticsearch 中獲取 DSL 查詢的結果。

6. **Download 函數**：
   - 這是一個下載功能的函數。它首先綁定請求到 `crudFilter`，然後使用 Navicat 服務從 Elasticsearch 中獲取需要下載的數據。最後，它使用 `DownloadExcel` 函數將數據下載為 Excel 文件。

整體來說，這段程式碼提供了一個 API 控制器，該控制器允許用戶執行多種與 Elasticsearch 相關的 CRUD 操作，如獲取數據列表、獲取 DSL 查詢的結果和下載數據。

## Terminology 

### DSL

DSL 是 Domain-Specific Language 的縮寫，中文譯為「特定領域語言」（或譯「領域特定語言」），也就是開發人員為了解決特定領域的問題所定義的專用語言⁴。例如，HTML 是針對網頁結構的語言，JSON 是針對資料結構的語言等等⁵。相較於通用目的語言 (GPL 或 General-purpose Language，如 Swift 本身)，DSL 的語法會更簡潔，邏輯更簡單⁵。

以下是一個 DSL 的範例¹：

```json
{
  "query": {
    "match_all": {} //your query parameter
  }
}
```

基本的查詢結構如下²：

```json
{
  QUERY_NAME: {
    ARGUMENT: VALUE,
    ARGUMENT: VALUE,...
  }
}
```

特定欄位查詢結構如下²：

```json
{
  QUERY_NAME: {
    FIELD_NAME: {
      ARGUMENT: VALUE,
      ARGUMENT: VALUE,...
    }
  }
}
```

查詢語法範例²：

```json
{
  "query": {
    "match": {
      "field": "value"
    }
  }
}
```

這些都是 DSL 的基本結構和使用方式。

來源: 與 Bing 的交談， 2023/10/25
(1) 開發人員的逆襲： Domain-Specific Languages - [Huan-Lin 學習筆記](https://www.huanlintalk.com/2008/05/domain-specific-languages.html).
(2) Swift DSL 實作：利用 Swift UI 寫出簡單又明瞭的 Auto Layout DSL - [AppCoda 中文版](https://www.appcoda.com.tw/swift-dsl/).
(3) DSL - Domain Specific Language 簡介 - [Maxkit](https://blog.maxkit.com.tw/2013/12/dsl-domain-specific-language.html).
(4) Day07 Kibana - Query DSL 語法結構 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天、[ithome](https://ithelp.ithome.com.tw/articles/10263378).
(5) Swift DSL 實作：利用 Swift UI 寫出簡單又明瞭的 Auto Layout DSL - [AppCoda 中文版](https://bing.com/search?q=DSL+%e8%aa%9e%e6%b3%95).
(6) undefined. [elastic.co](https://www.elastic.co/guide/en/elasticsearch/guide/current/query-dsl-intro.html.)

[dsl]: https://www.huanlintalk.com/2008/05/domain-specific-languages.html "Domain-Specific Languages - Huan-Lin 學習筆記."

### CRUD

"Elasticsearch 的 CRUD 操作" 是指在 Elasticsearch 中進行創建（Create）、讀取（Read）、更新（Update）和刪除（Delete）操作。這些操作是數據庫交互的基礎⁴。

- **創建**：在 Elasticsearch 中添加新的文檔或索引⁴。
- **讀取**：從 Elasticsearch 中獲取特定的文檔或索引的資訊⁵。
- **更新**：修改 Elasticsearch 中已存在的文檔或索引⁴。
- **刪除**：移除 Elasticsearch 中的特定文檔或索引⁵。

這些操作使得用戶可以靈活地管理和操作 Elasticsearch 中的數據⁴⁵。如果您需要更多詳細資訊，請告訴我。

來源: 與 Bing 的交談， 2023/10/25
(1) Elasticsearch（二）—— es的文档、索引的CRUD操作 - [CSDN博客](https://blog.csdn.net/hxxjxw/article/details/107518490).
(2) Elasticsearch-文档的 CRUD-腾讯云开发者社区-[腾讯云](https://cloud.tencent.com/developer/article/1487248).
(3) Elasticsearch CRUD基本操作 - 狼爷 - [博客园](https://www.cnblogs.com/powercto/p/14438907.html).
(4) ES索引的基本操作(CRUD)_es crud-[CSDN博客](https://blog.csdn.net/weixin_37692493/article/details/107898936).
(5) Elasticsearch-文档的 CRUD-腾讯云开发者社区-[腾讯云](https://bing.com/search?q=Elasticsearch+%e7%9a%84+CRUD+%e6%93%8d%e4%bd%9c).
(6) ElasticSearch的CRUD操作_"_shards\" : { \"total\" : 42, \"successful\" : [25-CSDN博客](https://blog.csdn.net/qq_44671288/article/details/108887844).

### Navicat
